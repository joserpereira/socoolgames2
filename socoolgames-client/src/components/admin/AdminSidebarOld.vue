<template>
      <div id="hs-pro-sidebar" class="hs-overlay [--auto-close:md]
      mt-8
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-65 hs-overlay-minified:w-13 overflow-hidden
  hidden
  fixed inset-y-0 z-60 start-0
  bg-sidebar border-e border-sidebar-line
  md:block md:translate-x-0 md:end-auto md:bottom-0" role="dialog" tabindex="-1" aria-label="Sidebar">
    <div class="relative flex flex-col h-full max-h-full">
      <!-- Header -->
      <header class="py-2.5 px-4 flex justify-between items-center gap-x-2">
        <div class="-ms-2 flex items-center gap-x-1">
          <div class="md:hs-overlay-minified:hidden">
            <a class="shrink-0 inline-flex justify-center items-center size-9 rounded-lg text-xl inline-block font-semibold hover:bg-muted-hover focus:outline-hidden focus:bg-muted-focus" href="index.html" aria-label="Preline">
              <!-- <svg class="shrink-0 size-5 text-primary" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" fill="currentColor" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" fill="currentColor" />
                <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" fill="currentColor" />
              </svg> -->
            </a>
          </div>

          <!-- Sidebar Toggle -->
          <button type="button" class="hidden md:hs-overlay-minified:flex justify-center items-center flex-none gap-x-3 size-9 text-sm text-muted-foreground-1 rounded-lg hover:bg-muted-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted-focus" aria-haspopup="dialog" aria-expanded="true" aria-controls="hs-pro-sidebar" aria-label="Minify navigation" data-hs-overlay-minifier="#hs-pro-sidebar">
            <svg class="hidden hs-overlay-minified:block shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M15 3v18"></path>
              <path d="m8 9 3 3-3 3"></path>
            </svg>
            <svg class="hs-overlay-minified:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M15 3v18"></path>
              <path d="m10 15-3-3 3-3"></path>
            </svg>
            <span class="sr-only">Sidebar Toggle</span>
          </button>
        </div>
        <!-- End Sidebar Toggle -->

        <!-- Sidebar Toggle -->
        <button type="button" class="hidden md:hs-overlay-minified:hidden md:flex justify-center items-center flex-none gap-x-3 size-9 text-sm text-muted-foreground-1 rounded-lg hover:bg-muted-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted-focus" aria-haspopup="dialog" aria-expanded="true" aria-controls="hs-pro-sidebar" aria-label="Minify navigation" data-hs-overlay-minifier="#hs-pro-sidebar">
          <svg class="hidden hs-overlay-minified:block shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M15 3v18"></path>
            <path d="m8 9 3 3-3 3"></path>
          </svg>
          <svg class="hs-overlay-minified:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M15 3v18"></path>
            <path d="m10 15-3-3 3-3"></path>
          </svg>
          <span class="sr-only">Sidebar Toggle</span>
        </button>
        <!-- End Sidebar Toggle -->

        <!-- Sidebar Toggle -->
        <button type="button" class="flex md:hidden justify-center items-center gap-x-3 size-6 bg-layer border border-layer-line text-sm text-muted-foreground-1 rounded-full hover:bg-muted-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted-focus" data-hs-overlay="#hs-pro-sidebar" aria-expanded="true">
          <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span class="sr-only">Close</span>
        </button>
        <!-- End Sidebar Toggle -->
      </header>
      <!-- End Header -->

      <div class="mb-5 px-2 flex flex-col gap-y-5">
        <!-- List -->
        <ul class="flex flex-col gap-y-0.5">
          <li>
            <a class="group relative w-full flex items-center gap-1 py-1.5 px-2.5 relative text-sm rounded-lg before:absolute before:inset-y-0 before:-start-2 before:rounded-e-full before:w-1 before:h-full bg-sidebar-nav-active/70 before:bg-primary text-primary hover:bg-sidebar-nav-active/70 focus:bg-sidebar-nav-active/70 " href="#">
              <span class="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                <svg class="shrink-0 size-4 group-hover:scale-115 group-focus:scale-115 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </span>
              <span class="truncate hs-overlay-minified:opacity-0 transition-opacity duration-300">New Page</span>
            </a>
          </li>
          <li>
            <button type="button" class="group w-full flex items-center gap-1 py-1.5 px-2.5 text-sm text-sidebar-nav-foreground truncate rounded-lg hover:bg-sidebar-nav-hover/70 focus:outline-hidden focus:bg-sidebar-nav-focus/70" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-pro-dnsm" data-hs-overlay="#hs-pro-dnsm">
              <span class="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path class="group-hover:scale-100 group-focus:scale-100 scale-115 scale-115 transition-transform duration-300" d="m21 21-4.34-4.34" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
              </span>
              <span class="truncate hs-overlay-minified:opacity-0 transition-opacity duration-300">Pages</span>
            </button>
          </li>
          <li>
            <a class="group relative w-full flex items-center gap-1 py-1.5 px-2.5 relative text-sm rounded-lg before:absolute before:inset-y-0 before:-start-2 before:rounded-e-full before:w-1 before:h-full  text-sidebar-nav-foreground hover:bg-sidebar-nav-hover/70 focus:bg-sidebar-nav-focus/70" href="#">
              <span class="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                <svg class="shrink-0 size-4 group-hover:rotate-180 group-focus:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </span>
              <span class="truncate hs-overlay-minified:opacity-0 transition-opacity duration-300">Pages</span>
            </a>
          </li>
          <li>
            <a class="group relative w-full flex items-center gap-1 py-1.5 px-2.5 relative text-sm rounded-lg before:absolute before:inset-y-0 before:-start-2 before:rounded-e-full before:w-1 before:h-full  text-sidebar-nav-foreground hover:bg-sidebar-nav-hover/70 focus:bg-sidebar-nav-focus/70" href="#">
              <span class="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path class="group-hover:scale-110 group-focus:scale-110 transition-transform duration-300" d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                  <path class="group-hover:scale-95 group-focus:scale-95 transition-transform duration-300" d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </span>
              <span class="truncate hs-overlay-minified:opacity-0 transition-opacity duration-300">Chat details</span>
            </a>
          </li>
        </ul>
        <!-- End List -->
      </div>

  
      <!-- End Body -->
    </div>
  </div>
</template>