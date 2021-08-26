import HoverIntent from "hoverintent";
import { gsap } from "gsap";

import $ from "jquery";

/**
 * Trigger dropdown in header
 *
 */
const dropDownTL = gsap.timeline({ defaults: { ease: "power1.out" } });
Array.from(document.getElementById("menu-primary-menu").children).map(
  (item) => {
    HoverIntent(
      item,
      () => {
        if (Array.from(item.children)[1]) {
          dropDownTL
            .to(Array.from(item.children)[1], {
              css: { display: "block" },
              duration: 0.1,
            })
            .to(Array.from(item.children)[1], {
              opacity: 1,
              y: 6,
              duration: 0.2,
            });
        }
      },
      () => {
        if (Array.from(item.children)[1]) {
          dropDownTL
            .to(Array.from(item.children)[1], {
              opacity: 0,
              y: -6,
              duration: 0.1,
            })
            .to(Array.from(item.children)[1], {
              css: { display: "none" },
              duration: 0.2,
            });
        }
      }
    ).options({ timeout: 100, interval: 50 });
  }
);

/**
 * Mobile navigation
 *
 */
const tlMobileNav = gsap.timeline({
  defaults: { ease: "power4.out" },
});

$(document).on("click", ".hamburger", function () {
  if ($(this).hasClass("is-active")) {
    tlMobileNav
      .to(".em-mobile-nav--container .em-mobile-nav--icons li", {
        opacity: 0,
        top: "-10px",
        duration: 0.6,
        stagger: {
          each: 0.1,
          from: "end",
        },
      })
      .to(
        ".em-mobile-nav--container .menu-primary-menu-container ul.menu > li",
        {
          opacity: 0,
          top: "-10px",
          duration: 0.6,
          stagger: {
            each: 0.1,
            from: "end",
          },
        },
        "-=0.5"
      )
      .to(
        ".em-mobile-nav--container .em-mobile-nav--backdrop",
        {
          y: "-150%",
          opacity: 0,
          duration: 1,
          ease: "slow(0.7, 0.7, 0.7, 0.7, false)",
        },
        "-=0.7"
      )
      .to(".em-mobile-nav--container", {
        display: "none",
        duration: 0.1,
      });

    $(this).removeClass("is-active");

    return;
  }

  $(this).addClass("is-active");

  tlMobileNav
    .to(".em-mobile-nav--container", {
      display: "block",
      duration: 0.1,
    })

    .to(
      ".em-mobile-nav--container .em-mobile-nav--backdrop",
      {
        y: 0,
        opacity: 0.98,
        duration: 1,
        ease: "power4.out",
      }
      /* "-=0.1" */
    )
    .to(
      ".em-mobile-nav--container .menu-primary-menu-container ul.menu > li",
      {
        opacity: 1,
        top: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.8"
    )
    .to(
      ".em-mobile-nav--container .em-mobile-nav--icons li",
      {
        opacity: 1,
        top: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.7"
    );
});
