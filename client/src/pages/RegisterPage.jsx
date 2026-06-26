import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center px-6">
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <img src="/assets/main.png" alt="توبة" className="h-16 mx-auto mb-3" />
        <p className="text-gray-400 text-sm font-arabic">انضم لأكثر من 5000 طالب</p>
      </div>
      <RegisterForm />
    </div>
  </div>
);
export default RegisterPage;
