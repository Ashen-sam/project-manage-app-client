import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import logo from '../../../../public/logo-7402513_640.png';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (email && password) {
                console.log('Login successful', { email, password });
            } else {
                setError('Please fill in all fields');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <img src={logo} alt="Projectly Logo" height={20} width={60} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}

                        <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                            Sign up free
                        </Link>
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="email"
                            type="email"
                            placeholder="wunder@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 text-sm bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 pr-10 text-sm bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription className="text-sm">{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button
                        onClick={handleSubmit}
                        className="w-full h-12 text-sm bg-purple-600 hover:bg-purple-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Login'}
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-gray-50 px-3 text-gray-500">or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-12" type="button">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </Button>
                        <Button variant="outline" className="h-12" type="button">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        By clicking continue, you agree to our{' '}
                        <button className="text-gray-700 hover:underline font-medium">Terms of Service</button>
                        {' '}and{' '}
                        <button className="text-gray-700 hover:underline font-medium">Privacy Policy</button>
                    </p>
                </div>
            </div>
        </div>
    );
}