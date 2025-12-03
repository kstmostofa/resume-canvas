export const BackgroundAccent = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden hidden dark:block">
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[100px]" />
      <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
    </div>
  );
};
