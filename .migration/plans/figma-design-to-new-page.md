# Figma Design → New Page Plan

## Overview
You want a new page built from a Figma design, and you've approved turning on the Figma add-on. **Nothing has changed yet because the session is still in planning mode. In this mode I can only read and plan, and saying "go ahead" or "execute" in chat doesn't switch it. Use the mode switch in the interface to move to Execute mode, then send any message.** I'll turn on the add-on first, and the Figma tools load on your message after that.

## Ready to Execute
- **Approval:** confirmed. You've asked me to go ahead three times.
- **Current state:** the project has no add-on settings file yet, so I'll create a new one with only the Figma add-on turned on. No other settings are affected.
- **Blocked on:** the session mode. It's still in planning mode, so I can't run anything until you switch it.

## Inputs Needed
- **Figma link:** the URL of the Figma file or frame for the page. Ideally it points to the exact frame (it contains `node-id=`).
- **Page path:** where the new page should go, for example `/about-us`. If you don't give one, I'll suggest a path based on the design's title.
- **Viewports (optional):** whether the Figma file has separate desktop and mobile frames.

## Approach
1. **Turn on the Figma add-on** by creating the add-on settings file with only the Figma add-on enabled. Then I'll stop, because the add-on loads on your next message.
2. **Read the Figma design.** Pull the frame structure, text, images and design values (colors, fonts, spacing).
3. **Analyze the page.** Split the design into sections and decide which parts are normal text and which become blocks. Reuse existing blocks from the site first, and only create new blocks or variants where needed.
4. **Build blocks and styles.** Create or adjust block code and CSS to match the design. Mobile layout comes first, with breakpoints at 600, 900 and 1200px. Shared values go into the global styles.
5. **Create the page content** with the project's import tooling, not by editing page files by hand.
6. **Check the preview.** Confirm the structure, styling and responsive behavior, compare against the Figma design, and fix any differences.
7. **Run quality checks.** Run lint and check accessibility: heading order, image alt text, and WCAG 2.1 AA contrast.

## Checklist
- [x] Get your approval to turn on the Figma add-on
- [x] Get your go-ahead to run the plan
- [ ] Switch the session to Execute mode with the mode switch in the interface (your step)
- [ ] Create the add-on settings file with the Figma add-on turned on, then stop
- [ ] On your next message, confirm the Figma tools are available
- [ ] Get the Figma link and target page path from you
- [ ] Read the Figma frame: structure, text, images, design values
- [ ] Map the design's sections to normal text or blocks, reusing existing blocks where possible
- [ ] Create or update the blocks and variants the design needs
- [ ] Apply design values to the global styles and block CSS (mobile first, 600/900/1200 breakpoints)
- [ ] Create the page content with the import tooling
- [ ] Check the page in the preview and compare it with the Figma design
- [ ] Fix any visual or structural differences
- [ ] Run lint and accessibility checks
- [ ] Summarize what was built and anything still open

## Notes
- Nothing gets published or pushed without your confirmation.
- You can include the Figma link and page path in the message you send after switching modes. I'll use them once the add-on has loaded.
