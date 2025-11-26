import { supabase } from '../lib/supabase'

interface GMControlsProps {
    roomId: string
    locked: boolean
}

export default function GMControls({ roomId, locked }: GMControlsProps) {
    const toggleLock = async () => {
        await supabase
            .from('rooms')
            .update({ locked: !locked })
            .eq('id', roomId)
    }

    return (
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-amber-200 flex items-center gap-2">
                        👑 Controles do Mestre
                    </h3>
                    <p className="text-amber-300/80 text-sm mt-1">
                        {locked ? 'Dados bloqueados para jogadores' : 'Dados liberados para todos'}
                    </p>
                </div>
                <button
                    onClick={toggleLock}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${locked
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                >
                    {locked ? '🔓 Desbloquear Dados' : '🔒 Bloquear Dados'}
                </button>
            </div>
        </div>
    )
}
