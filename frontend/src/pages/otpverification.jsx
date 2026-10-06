const OtpVerification = () => {
  return (
    <div className="flex justify-center mt-20">
      <form className="w-96 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-2 text-center">Verify OTP</h2>

        <p className="text-gray-500 text-center mb-6">
          Enter the OTP sent to your email
        </p>

        <label className="block mb-2">Enter OTP</label>

        <input
          type="text"
          placeholder="Enter 6 digit OTP"
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
