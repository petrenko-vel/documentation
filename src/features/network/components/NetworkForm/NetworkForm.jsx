

export default function NetworkForm() {

    const [password, setPassword] = useState('');

     const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="network__password" onSubmit={handleSubmit}>
            <input 
                className="network__password-input"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
             <button
                type="button"
                className="network__password-button"
            >
                вкл
            </button>
        </form>
    )
}