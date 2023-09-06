

export function LoginModal({ closeDemoLogin, login, logout }) {

    function onLogin(userType) {
        login(userType)
        closeDemoLogin()
    }

    const adminLogin = { fullname: "", isAdmin: false, password: "1", username: "1" }
    const customerLogin = { fullname: "", isAdmin: false, password: "2", username: "2" }

    return (
        <div className="demo-login-modal">
            <div className="modal-content">
                <section className="login-btns">

                    <button onClick={() => onLogin(adminLogin)}>Admin login</button>
                    <button onClick={() => onLogin(customerLogin)}>Customer login</button>
                </section>
                <button onClick={closeDemoLogin}>Close</button>
            </div>
        </div>
    )
}