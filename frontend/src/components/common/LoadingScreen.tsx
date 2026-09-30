export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

        <p className="mt-4 text-sm text-gray-500">
          Loading FlowForge...
        </p>
      </div>
    </div>
  );
}
