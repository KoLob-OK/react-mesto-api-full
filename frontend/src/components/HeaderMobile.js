function HeaderMobile({ email, onSignOut, isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="header__menu-mobile">
          <p className="header__email">{email}</p>
          <button onClick={onSignOut} className="header__out-btn">
            Выйти
          </button>
        </div>
      )}
    </>
  );
}

export default HeaderMobile;
