<template>
  <main class="md:ps-65 md:hs-overlay-minified:ps-13 transition-all duration-300 pb-4 h-screen flex flex-col">
    <!-- ========== HEADER ========== -->
    <header class="md:ms-65 xl:hs-overlay-layout-open:me-96 md:hs-overlay-minified:ms-13 transition-all duration-300 fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 md:z-61 bg-navbar py-2.5">
      <nav class="px-4 sm:px-5.5 flex basis-full justify-between items-center w-full mx-auto">
        <!-- Button Group -->
        <div class="flex items-center sm:gap-x-1.5 truncate">
          <!-- Sidebar Toggle -->
          <button type="button" class="md:hidden flex justify-center items-center flex-none gap-x-3 size-9 text-sm text-muted-foreground-1 rounded-lg hover:bg-muted-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted-focus" aria-haspopup="dialog" aria-expanded="true" aria-controls="hs-pro-sidebar" aria-label="Minify navigation" data-hs-overlay="#hs-pro-sidebar">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M15 3v18"></path>
              <path d="m8 9 3 3-3 3"></path>
            </svg>
            <span class="sr-only">Sidebar Toggle</span>
          </button>
          <!-- End Sidebar Toggle -->

          <a class="me-4 flex justify-center items-center gap-x-1.5 py-2 px-2.5 text-sm whitespace-nowrap text-primary rounded-lg hover:bg-primary-hover/10 focus:outline-hidden focus:bg-primary-focus/10 disabled:opacity-50 disabled:pointer-events-none" href="#">
            So Cool Games
          </a>
        </div>
        <!-- End Button Group -->

        <!-- Button Group -->
        <div class="flex items-center sm:gap-x-1.5">
          <!-- More Dropdown -->
          <div class="hs-dropdown [--strategy:absolute] [--placement:bottom-right] relative inline-flex">
            <button id="hs-pro-ainmd" type="button" class="flex justify-center items-center gap-x-3 size-9 text-sm text-foreground hover:bg-muted-hover rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted-focus">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>

            <!-- More Dropdown -->
            <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-32 transition-[opacity,margin] duration opacity-0 hidden z-11 bg-dropdown border border-dropdown-line rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-ainmd">
              <div class="p-1 space-y-0.5">
                <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v13" />
                    <path d="m16 6-4-4-4 4" />
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  </svg>
                  Share
                </button>
                <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Rename
                </button>
                <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="5" x="2" y="3" rx="1" />
                    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                    <path d="M10 12h4" />
                  </svg>
                  Archive
                </button>
                <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-sm text-destructive hover:bg-destructive-hover/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-destructive-focus/10">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
            <!-- End More Dropdown -->
          </div>
          <!-- End More Dropdown -->

          <!-- Account Dropdown -->
          <div class="hs-dropdown inline-flex [--strategy:absolute] [--auto-close:inside] [--placement:bottom-right] relative text-start">
            <button id="hs-dnad" type="button" class="p-0.5 inline-flex shrink-0 items-center gap-x-3 text-start text-sm text-foreground rounded-full hover:bg-muted-hover focus:outline-hidden focus:bg-muted-focus" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <img class="shrink-0 size-8 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar">
            </button>

            <!-- Account Dropdown -->
            <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-dropdown border border-dropdown-line rounded-xl shadow-xl" role="menu" aria-orientation="vertical" aria-labelledby="hs-dnad">
              <div class="py-2 px-3.5">
                <span class="font-medium text-foreground">
                  James Collison
                </span>
                <p class="text-sm text-muted-foreground-1">
                  jamescollison@site.com
                </p>
                <div class="mt-1.5">
                  <a class="flex justify-center items-center gap-x-1.5 py-2 px-2.5 font-medium text-[13px] bg-primary border border-primary-line text-primary-foreground rounded-lg hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus disabled:opacity-50 disabled:pointer-events-none" href="#">
                    Upgrade plan
                  </a>
                </div>
              </div>
              <div class="px-4 py-2 border-t border-dropdown-divider">
                <!-- Switch/Toggle -->
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <span class="flex-1 cursor-pointer text-sm text-foreground">Theme</span>
                  <div class="p-0.5 inline-flex cursor-pointer bg-surface rounded-full">
                    <button type="button" class="size-7 flex justify-center items-center bg-layer shadow-sm text-layer-foreground rounded-full hs-auto-mode-active:bg-transparent hs-auto-mode-active:shadow-none hs-dark-mode-active:bg-transparent hs-dark-mode-active:shadow-none" data-hs-theme-click-value="default">
                      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 3v1" />
                        <path d="M12 20v1" />
                        <path d="M3 12h1" />
                        <path d="M20 12h1" />
                        <path d="m18.364 5.636-.707.707" />
                        <path d="m6.343 17.657-.707.707" />
                        <path d="m5.636 5.636.707.707" />
                        <path d="m17.657 17.657.707.707" />
                      </svg>
                      <span class="sr-only">Default (Light)</span>
                    </button>
                    <button type="button" class="size-7 flex justify-center items-center text-layer-foreground rounded-full hs-dark-mode-active:bg-secondary-active hs-dark-mode-active:text-secondary-foreground hs-dark-mode-active:shadow-sm" data-hs-theme-click-value="dark">
                      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                      <span class="sr-only">Dark</span>
                    </button>
                    <button type="button" class="size-7 flex justify-center items-center text-layer-foreground rounded-full hs-auto-light-mode-active:bg-layer hs-auto-mode-active:shadow-sm" data-hs-theme-click-value="auto">
                      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="8" x2="16" y1="21" y2="21" />
                        <line x1="12" x2="12" y1="17" y2="21" />
                      </svg>
                      <span class="sr-only">Auto (System)</span>
                    </button>
                  </div>
                </div>
                <!-- End Switch/Toggle -->
              </div>
              <div class="p-1 border-t border-dropdown-divider">
                <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus" href="#">
                  <svg class="shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </a>
                <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus" href="#">
                  <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Settings
                </a>
                <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus" href="#">
                  <svg class="shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m16 17 5-5-5-5" />
                    <path d="M21 12H9" />
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  </svg>
                  Log out
                </a>
              </div>
            </div>
            <!-- End Account Dropdown -->
          </div>
          <!-- End Account Dropdown -->
        </div>
        <!-- End Button Group -->
      </nav>
    </header>
    <!-- ========== END HEADER ========== -->

    <div class="h-full flex flex-col justify-between mt-20 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading -->
    <div>Dashboard

    </div>
    </div>
  </main>
</template>