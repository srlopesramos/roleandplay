interface Roll {
    id: string
    player_name: string
    result: number
    created_at: string
}

interface HistoryLogProps {
    rolls: Roll[]
}

export default function HistoryLog({ rolls }: HistoryLogProps) {
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">📜 Histórico</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {rolls.length === 0 ? (
                    <p className="text-purple-300 text-sm text-center py-4">
                        Nenhuma jogada ainda
                    </p>
                ) : (
                    rolls.map((roll) => (
                        <div
                            key={roll.id}
                            className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-white font-semibold">{roll.player_name}</div>
                                    <div className="text-purple-300 text-xs">{formatTime(roll.created_at)}</div>
                                </div>
                                <div className="text-3xl font-bold text-purple-400">{roll.result}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
