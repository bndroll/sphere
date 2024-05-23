import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import {
  UserRegistryContext,
  UserRegistryContextType,
} from "@/utils/context/UserRegistryContext";

export const RegistrationView = () => {
  const context = useContext<UserRegistryContextType>(UserRegistryContext);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={context.progress.percent}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0.1 }}
        transition={{ duration: 0.2 }}
      >
        {context.progress.step}
      </motion.div>
    </AnimatePresence>
  );
};
