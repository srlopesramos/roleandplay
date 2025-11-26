interface Roll {
    id: string
    player_name: string
    result: number
    created_at: string
}

interface RollDisplayProps {
    latestRoll: Roll | null
}

export default function RollDisplay({ latestRoll }: RollDisplayProps) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 border border-white/20">
            <div className="text-center">
                {latestRoll ? (
                    <>
                        <div className="text-8xl font-bold text-white mb-4 animate-bounce">
                            {latestRoll.result}
                        </div>
                        <div className="text-xl text-purple-200">
                            Rolado por: <span className="font-semibold text-white">{latestRoll.player_name}</span>
                        </div>
                    </>
                ) : (
                    <div className="text-2xl text-purple-300">
                        Aguardando primeira jogada...
                    </div>
                )}
            </div>
        </div>
    )
}
