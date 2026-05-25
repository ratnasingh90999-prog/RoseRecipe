import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";

export function IngredientChip({
  label,
  onRemove,
  onClick,
  active,
}: {
  label: string;
  onRemove?: () => void;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "gradient-button"
          : "glass text-rose-700 hover:shadow-[0_8px_24px_-6px_rgba(255,122,162,0.4)]"
      }`}
    >
      <span>{label}</span>
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="grid h-4 w-4 place-items-center rounded-full bg-white/60 text-rose-500 transition-colors hover:bg-rose-500 hover:text-white"
        >
          <HiX className="h-3 w-3" />
        </span>
      )}
    </motion.button>
  );
}