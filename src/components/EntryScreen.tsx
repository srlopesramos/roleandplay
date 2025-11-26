import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface EntryScreenProps {
    onJoinRoom: (data: { roomCode: string; playerName: string; isGM: boolean }) => void
}

export default function EntryScreen({ onJoinRoom }: EntryScreenProps) {
    const [playerName, setPlayerName] = useState('')
    const [roomCode, setRoomCode] = useState('')
    const [isCreatingRoom, setIsCreatingRoom] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const generateRoomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    const handleCreateRoom = async () => {
        if (!playerName.trim()) {
            setError('Por favor, digite seu nome')
            return
        }

        setLoading(true)
        setError('')

        try {
            const newRoomCode = generateRoomCode()

            const { error: insertError } = await supabase
                .from('rooms')
                .insert({ code: newRoomCode })

            if (insertError) throw insertError

            onJoinRoom({ roomCode: newRoomCode, playerName, isGM: true })
        } catch (err) {
            console.error('Error creating room:', err)
            setError('Erro ao criar sala. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    const handleJoinRoom = async () => {
        if (!playerName.trim()) {
            setError('Por favor, digite seu nome')
            return
        }

        if (!roomCode.trim()) {
            setError('Por favor, digite o código da sala')
            return
        }

        setLoading(true)
        setError('')

        try {
            const { data, error: fetchError } = await supabase
                .from('rooms')
                .select('code')
                .eq('code', roomCode.toUpperCase())
                .single()

            if (fetchError || !data) {
                setError('Sala não encontrada')
                return
            }

            onJoinRoom({ roomCode: roomCode.toUpperCase(), playerName, isGM: false })
        } catch (err) {
            console.error('Error joining room:', err)
            setError('Erro ao entrar na sala. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <h1 className="text-4xl font-bold text-white text-center mb-2">
                        🎲 Role & Play
                    </h1>
                    <p className="text-purple-200 text-center mb-8">
                        Sistema de Dados em Tempo Real
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-purple-200 mb-2">
                                Seu Nome
                            </label>
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Digite seu nome"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                disabled={loading}
                            />
                        </div>

                        {!isCreatingRoom && (
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">
                                    Código da Sala
                                </label>
                                <input
                                    type="text"
                                    value={roomCode}
                                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                    placeholder="Ex: ABC123"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                                    disabled={loading}
                                    maxLength={6}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3 pt-2">
                            {!isCreatingRoom ? (
                                <>
                                    <button
                                        onClick={handleJoinRoom}
                                        disabled={loading}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Entrando...' : 'Entrar na Sala'}
                                    </button>
                                    <button
                                        onClick={() => setIsCreatingRoom(true)}
                                        disabled={loading}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors border border-white/20"
                                    >
                                        Criar Nova Sala
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleCreateRoom}
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Criando...' : 'Criar Sala (Mestre)'}
                                    </button>
                                    <button
                                        onClick={() => setIsCreatingRoom(false)}
                                        disabled={loading}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors border border-white/20"
                                    >
                                        Voltar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
