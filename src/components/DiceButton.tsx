interface DiceButtonProps {
    onRoll: () => void
    disabled: boolean
    locked: boolean
    isGM: boolean
}

export default function DiceButton({ onRoll, disabled, locked, isGM }: DiceButtonProps) {
    const getButtonText = () => {
        if (locked && !isGM) {
            return '🔒 Dados Bloqueados pelo Mestre'
        }
        if (locked && isGM) {
            return '🎲 Rolar Dado (d20) - Sala Bloqueada'
        }
        return '🎲 Rolar Dado (d20)'
    }

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <button
                onClick={onRoll}
                disabled={disabled}
                className={`w-full font-bold py-8 px-6 rounded-xl text-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg ${disabled
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    }`}
            >
                {getButtonText()}
            </button>
        </div>
    )
}
