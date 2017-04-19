<nav class="nav">
    <div class="container">
        <div class="nav-left nav-brand">
            <a href="/" class="nav-item">
                <b>Tree</b>Source
            </a>
            <small class="nav-item">
                Citizen science app
            </small>
        </div>

        <div class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="nav-right nav-menu">
            <a href="/" class="nav-item">
                Home
            </a>

            <a href="/" class="nav-item">
                Help
            </a>

            <a href="/" class="nav-item">
                About
            </a>

            @if(auth()->check())
                <a href="/account" class="nav-item">
                    Account
                </a>

                @if(auth()->user()->isAdmin())
                    <a href="/admin" class="nav-item">
                        Admin
                    </a>
                @endif

                <a href="/logout" class="nav-item">
                    Logout
                </a>
            @else
                <a href="/login" class="nav-item">
                    Login
                </a>

                <a href="/register" class="nav-item">
                    Register
                </a>
            @endif
        </div>
    </div>
</nav>