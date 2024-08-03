<header>
  <div>
    <a class="brand" href="/">Info<span>Pile</span></a>
  </div>
  <nav>
    <a class="button secondary" href="/login">Log In</a>
    <a class="button" data-scheme="accent" href="/signup">Sign Up</a>
  </nav>
</header>

<style lang="postcss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: var(--border);
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .brand {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;

    & span {
      color: var(--brand-60);
    }
  }
</style>
