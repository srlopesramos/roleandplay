import { useState } from 'react'
import EntryScreen from './components/EntryScreen'
import GameRoom from './components/GameRoom'

interface RoomData {
    roomCode: string
    playerName: string
    isGM: boolean
}

function App() {
    const [roomData, setRoomData] = useState<RoomData | null>(null)

    const handleJoinRoom = (data: RoomData) => {
        setRoomData(data)
    }

    const handleLeaveRoom = () => {
        setRoomData(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {!roomData ? (
                <EntryScreen onJoinRoom={handleJoinRoom} />
            ) : (
                <GameRoom
                    roomCode={roomData.roomCode}
                    playerName={roomData.playerName}
                    isGM={roomData.isGM}
                    onLeave={handleLeaveRoom}
                />
            )}
        </div>
    )
}

export default App
