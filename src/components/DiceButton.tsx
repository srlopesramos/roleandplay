interface DiceButtonProps {
    onRoll: () => void
    disabled: boolean
}

export default function DiceButton({ onRoll, disabled }: DiceButtonProps) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <button
                onClick={onRoll}
                disabled={disabled}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-8 px-6 rounded-xl text-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
                🎲 Rolar Dado (d20)
            </button>
        </div>
    )
}
