import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center px-6">
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <img src="/assets/main.png" alt="توبة" className="h-16 mx-auto mb-3" />
      </div>
      <LoginForm />
    </div>
  </div>
);
export default LoginPage;
