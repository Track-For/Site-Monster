export function Header() {
  return (
    <header className="site-header">
      <a className="site-identity" href="#inicio" aria-label="Voltar ao início">
        <strong>MONSTER ENERGY</strong>
        <span>CONCEITO INDEPENDENTE</span>
      </a>
      <nav className="site-nav" aria-label="Navegação principal">
        <a href="#sabores">SABORES</a>
        <a href="#detalhes">DETALHES</a>
        <a href="#encerramento">EXPLORAR</a>
      </nav>
    </header>
  );
}
