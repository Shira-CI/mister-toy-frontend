

export function LoginModal({ closeDemoLogin }) {


    return (
        <div className="demo-login-modal">
            <div className="modal-content">
                <button>Admin login</button>
                <button>Customer login</button>
                <button onClick={closeDemoLogin}>Close</button>
            </div>
        </div>
    )
}