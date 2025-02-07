export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          width: 60px;
          height: 60px;
          border: 6px solid #7f57f1;
          border-top: 6px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
