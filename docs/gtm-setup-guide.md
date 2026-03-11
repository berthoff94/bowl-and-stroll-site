# Bowl & Stroll — GTM, GA4 & Google Ads Tracking Setup Guide

Step-by-step configuration for Google Tag Manager, Google Analytics 4, and Google Ads conversion tracking.

---

## 1. Create Accounts

### Google Tag Manager
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Create Account → Account name: "Bowl & Stroll"
3. Container name: "bowlandstroll.com" → Platform: Web
4. Copy the **Container ID** (format: `GTM-XXXXXXX`)
5. Replace `GTM-XXXXXXX` in `index.html` (appears twice: head snippet and noscript)

### Google Analytics 4
1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Create Property → "Bowl & Stroll"
3. Create Web Data Stream → URL: bowlandstroll.com
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Google Ads
1. Go to [ads.google.com](https://ads.google.com)
2. Create account (or use existing)
3. Settings → Auto-tagging: **ON**
4. Tools → Linked accounts → Link GA4 property
5. Tools → Linked accounts → Link Google Business Profile
6. Copy the **Conversion ID** (format: `AW-XXXXXXXXX`)

---

## 2. GTM Variables

Create these Data Layer Variables in GTM (Variables → User-Defined Variables → New):

| Variable Name | Type | Data Layer Variable Name |
|---|---|---|
| DLV - event_category | Data Layer Variable | `event_category` |
| DLV - event_action | Data Layer Variable | `event_action` |
| DLV - event_label | Data Layer Variable | `event_label` |
| DLV - outbound_url | Data Layer Variable | `outbound_url` |
| DLV - click_location | Data Layer Variable | `click_location` |
| DLV - scroll_percentage | Data Layer Variable | `scroll_percentage` |
| DLV - seconds_elapsed | Data Layer Variable | `seconds_elapsed` |
| DLV - menu_section | Data Layer Variable | `menu_section` |
| DLV - section_id | Data Layer Variable | `section_id` |

---

## 3. GTM Triggers

Create these Custom Event triggers (Triggers → New → Custom Event):

| Trigger Name | Event Name | Purpose |
|---|---|---|
| CE - StoreKit Click | `storekit_click` | Collection order click |
| CE - Deliveroo Click | `deliveroo_click` | Deliveroo order click |
| CE - Uber Eats Click | `uber_eats_click` | Uber Eats order click |
| CE - Catering Click | `catering_click` | Catering menu click |
| CE - Phone Click | `phone_click` | Phone number click |
| CE - Loyalty Signup | `loyalty_signup` | Join Rewards click |
| CE - Loyalty Modal Open | `loyalty_modal_open` | Signup modal opened |
| CE - Directions Click | `directions_click` | Get Directions click |
| CE - Scroll Depth | `scroll_depth` | Scroll milestone hit |
| CE - Time on Page | `time_on_page` | Time milestone hit |
| CE - Menu Section View | `menu_section_view` | Menu tab clicked |
| CE - Section View | `section_view` | Page section scrolled into view |

---

## 4. GTM Tags

### Tag 1: GA4 Configuration

| Setting | Value |
|---|---|
| Tag Type | Google Analytics: GA4 Configuration |
| Measurement ID | `G-XXXXXXXXXX` (your GA4 ID) |
| Trigger | All Pages |

### Tags 2–7: GA4 Conversion Events

Create one tag per conversion event:

**Tag 2: GA4 - StoreKit Click**
| Setting | Value |
|---|---|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | Tag 1 (GA4 Configuration) |
| Event Name | `storekit_click` |
| Event Parameters | `event_category` = `{{DLV - event_category}}`, `event_label` = `{{DLV - event_label}}`, `outbound_url` = `{{DLV - outbound_url}}`, `click_location` = `{{DLV - click_location}}` |
| Trigger | CE - StoreKit Click |

**Tag 3: GA4 - Deliveroo Click**
- Same structure, Event Name: `deliveroo_click`, Trigger: CE - Deliveroo Click

**Tag 4: GA4 - Uber Eats Click**
- Same structure, Event Name: `uber_eats_click`, Trigger: CE - Uber Eats Click

**Tag 5: GA4 - Catering Click**
- Same structure, Event Name: `catering_click`, Trigger: CE - Catering Click

**Tag 6: GA4 - Phone Click**
- Same structure, Event Name: `phone_click`, Trigger: CE - Phone Click

**Tag 7: GA4 - Loyalty Signup**
- Same structure, Event Name: `loyalty_signup`, Trigger: CE - Loyalty Signup

### Tag 8: GA4 - Engagement Events (Scroll, Time, Menu)

| Setting | Value |
|---|---|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | Tag 1 |
| Event Name | `{{Event}}` (built-in variable) |
| Event Parameters | `scroll_percentage` = `{{DLV - scroll_percentage}}`, `seconds_elapsed` = `{{DLV - seconds_elapsed}}`, `menu_section` = `{{DLV - menu_section}}`, `section_id` = `{{DLV - section_id}}` |
| Trigger | CE - Scroll Depth OR CE - Time on Page OR CE - Menu Section View OR CE - Section View |

### Tag 9: Google Ads Conversion Tracking

Create one tag per conversion action. Each needs a unique **Conversion Label** from Google Ads (see Section 5).

| Setting | Value |
|---|---|
| Tag Type | Google Ads Conversion Tracking |
| Conversion ID | `AW-XXXXXXXXX` (your Google Ads ID) |
| Conversion Label | Unique per action (see Section 5) |
| Trigger | Matching conversion trigger |

**Create these conversion tags:**

| Tag Name | Trigger | Conversion Action |
|---|---|---|
| GAds - StoreKit Conversion | CE - StoreKit Click | StoreKit Order Click |
| GAds - Deliveroo Conversion | CE - Deliveroo Click | Deliveroo Order Click |
| GAds - Uber Eats Conversion | CE - Uber Eats Click | Uber Eats Order Click |
| GAds - Catering Conversion | CE - Catering Click | Catering Inquiry |
| GAds - Phone Conversion | CE - Phone Click | Phone Call Click |
| GAds - Loyalty Conversion | CE - Loyalty Signup | Loyalty Signup |

### Tag 10: Google Ads Remarketing

| Setting | Value |
|---|---|
| Tag Type | Google Ads Remarketing |
| Conversion ID | `AW-XXXXXXXXX` |
| Trigger | All Pages |

---

## 5. Google Ads Conversion Actions

Create these in Google Ads (Goals → Conversions → New Conversion Action → Website):

| Conversion Action | Category | Default Value | Count | Conversion Label |
|---|---|---|---|---|
| StoreKit Order Click | Purchase | £9.00 | Every | _(auto-generated — copy to GTM Tag 9)_ |
| Deliveroo Order Click | Purchase | £12.00 | Every | _(auto-generated — copy to GTM Tag 9)_ |
| Uber Eats Order Click | Purchase | £12.00 | Every | _(auto-generated — copy to GTM Tag 9)_ |
| Catering Inquiry | Lead | £50.00 | One | _(auto-generated — copy to GTM Tag 9)_ |
| Phone Call Click | Lead | £15.00 | One | _(auto-generated — copy to GTM Tag 9)_ |
| Loyalty Signup | Sign-up | £5.00 | One | _(auto-generated — copy to GTM Tag 9)_ |

**Attribution model:** Data-driven (default)
**Conversion window:** 30 days click, 1 day view

---

## 6. GA4 Event Marking

In GA4 (Admin → Events), mark these events as conversions:

- `storekit_click`
- `deliveroo_click`
- `uber_eats_click`
- `catering_click`
- `phone_click`
- `loyalty_signup`

---

## 7. Testing & Verification

### GTM Preview Mode
1. In GTM, click **Preview** (top right)
2. Enter URL: `https://bowlandstroll.com`
3. The Tag Assistant panel will open alongside the site
4. Click every CTA and verify:
   - Correct event fires in the dataLayer
   - Matching tag fires in GTM
   - Event parameters contain expected values

### Verify UTM Injection
1. Right-click any StoreKit/Deliveroo/Uber Eats link
2. Copy link address
3. Confirm UTM parameters are appended:
   - Organic visit: `utm_source=bowlandstroll_website&utm_medium=organic&utm_campaign=website_referral&utm_content=[label]`
   - Google Ads visit: `utm_source=google&utm_medium=cpc&utm_campaign=[campaign]&utm_content=[label]`

### GA4 Realtime
1. Go to GA4 → Reports → Realtime
2. Navigate to the site and click buttons
3. Confirm events appear with correct names and parameters

### Google Ads Conversion Status
1. After publishing, wait 24–48 hours
2. Check Goals → Conversions → each action should show "Recording conversions" or "No recent conversions" (not "Unverified")

---

## 8. Publish Checklist

- [ ] GTM Container ID replaced in index.html (both instances of `GTM-XXXXXXX`)
- [ ] GA4 Measurement ID entered in GTM Tag 1
- [ ] Google Ads Conversion ID entered in GTM Tags 9–10
- [ ] All 6 conversion labels copied from Google Ads to GTM tags
- [ ] GTM container published (Submit → Publish)
- [ ] Preview mode tested — all events firing correctly
- [ ] GA4 realtime showing events
- [ ] Google Ads conversion actions showing as "Recording"
- [ ] Auto-tagging enabled in Google Ads
- [ ] Google Business Profile linked
