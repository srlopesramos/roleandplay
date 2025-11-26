import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import DiceButton from './DiceButton'
import RollDisplay from './RollDisplay'
import HistoryLog from './HistoryLog'
import GMControls from './GMControls'

interface GameRoomProps {
    roomCode: string
    playerName: string
    isGM: boolean
    onLeave: () => void
}

interface Roll {
    id: string
    player_name: string
    result: number
    created_at: string
}

export default function GameRoom({ roomCode, playerName, isGM, onLeave }: GameRoomProps) {
    const [rolls, setRolls] = useState<Roll[]>([])
    const [latestRoll, setLatestRoll] = useState<Roll | null>(null)
    const [roomId, setRoomId] = useState<string | null>(null)
    const [locked, setLocked] = useState(false)

    useEffect(() => {
        const fetchRoomData = async () => {
            const { data } = await supabase
                .from('rooms')
                .select('id, locked')
                .eq('code', roomCode)
                .single()

            if (data) {
                setRoomId(data.id)
                setLocked(data.locked || false)
            }
        }

        fetchRoomData()
    }, [roomCode])

    useEffect(() => {
        if (!roomId) return

        // Fetch existing rolls
        const fetchRolls = async () => {
            const { data } = await supabase
                .from('rolls')
                .select('*')
                .eq('room_id', roomId)
                .order('created_at', { ascending: false })
                .limit(10)

            if (data) {
                setRolls(data)
                if (data.length > 0) {
                    setLatestRoll(data[0])
                }
            }
        }

        fetchRolls()

        // Subscribe to new rolls
        const rollsChannel = supabase
            .channel(`rolls-${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'rolls',
                    filter: `room_id=eq.${roomId}`,
                },
                (payload) => {
                    const newRoll = payload.new as Roll
                    setLatestRoll(newRoll)
                    setRolls((prev) => [newRoll, ...prev].slice(0, 10))
                }
            )
            .subscribe()

        // Subscribe to room lock status changes
        const roomChannel = supabase
            .channel(`room-${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'rooms',
                    filter: `id=eq.${roomId}`,
                },
                (payload) => {
                    const updatedRoom = payload.new as { locked: boolean }
                    setLocked(updatedRoom.locked)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(rollsChannel)
            supabase.removeChannel(roomChannel)
        }
    }, [roomId])

    const handleRoll = async () => {
        if (!roomId) return

        const result = Math.floor(Math.random() * 20) + 1

        await supabase.from('rolls').insert({
            room_id: roomId,
            player_name: playerName,
            result,
        })
    }

    return (
        <div className="min-h-screen p-4 flex items-center justify-center">
            <div className="max-w-5xl w-full mx-auto">
                {/* Header */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Sala: {roomCode}</h2>
                            <p className="text-purple-200">
                                {playerName} {isGM && '👑 (Mestre)'}
                            </p>
                        </div>
                        <button
                            onClick={onLeave}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors border border-red-500/50"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Main Game Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Dice Roll Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {isGM && roomId && <GMControls roomId={roomId} locked={locked} />}
                        <RollDisplay latestRoll={latestRoll} />
                        <DiceButton
                            onRoll={handleRoll}
                            disabled={locked && !isGM}
                            locked={locked}
                            isGM={isGM}
                        />
                    </div>

                    {/* History Sidebar */}
                    <div className="lg:col-span-1">
                        <HistoryLog rolls={rolls} />
                    </div>
                </div>
            </div>
        </div>
    )
}
