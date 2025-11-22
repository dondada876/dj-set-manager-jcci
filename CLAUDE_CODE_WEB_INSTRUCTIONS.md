# Instructions for Claude Code Web
## DJ Set Manager - Architecture & Implementation

**Repository**: dj-set-manager-jcci
**Base ID**: `appWmtXSMrDKo5e8A`
**Current Status**: Initial structure created, needs full implementation

---

## 🎯 YOUR MISSION

You are architecting and implementing a comprehensive DJ booking and event management system for the **One Love Jamaica Relief** fundraiser. The system is built on Airtable with Node.js automation scripts.

**What's Already Done**:
✅ Repository structure created
✅ Documentation written (see `docs/`)
✅ Package.json with all scripts defined
✅ Initial setup script (`scripts/setup.js`)

**What You Need to Build**:
🔨 All automation scripts in `scripts/`
🔨 Airtable API wrappers in `src/airtable/`
🔨 Utility functions in `src/utils/`
🔨 Test files in `tests/`
🔨 Additional documentation in `docs/`

---

## 📚 CONTEXT & REQUIREMENTS

### Read These Files First:
1. **[README.md](README.md)** - Project overview
2. **[docs/COMPLETE_GUIDE.md](docs/COMPLETE_GUIDE.md)** - Full system spec with tables, fields, views
3. **[docs/ORIGINAL_PRD.md](docs/ORIGINAL_PRD.md)** - Original product requirements document
4. **[docs/QUICK_START.md](docs/QUICK_START.md)** - Quick reference for user roles

### Key Requirements:
- **5 User Roles**: Promoter (owner), Venue Owner (editor), DJs (form only), Public (read-only), Waitlist (form only)
- **4 Tables**: DJ_Bookings, Time_Slots, Event_Metrics, Event_Settings
- **12 Time Slots**: 3pm-11pm with varying durations (30/45/60 min)
- **Event Metrics**: Track attendance, bar sales, vibe every 30 minutes
- **Extension Decision**: Automated recommendation at 10pm based on metrics

---

## 🏗️ ARCHITECTURE OVERVIEW

### Technology Stack
- **Backend**: Node.js 18+ with ES modules
- **Database**: Airtable (via REST API)
- **CLI**: Interactive with chalk, inquirer, ora
- **Environment**: dotenv for configuration
- **Testing**: Node.js native test runner

### Data Flow
```
DJ → Form → DJ_Bookings → Automation → Confirmation Email
                         → Link to Time_Slots
                         → Update Status

Event Day → Metrics Form → Event_Metrics → Formula → Extension Recommendation

Post-Event → Analytics Script → Export CSV → Generate Report
```

---

## 📝 FILES TO CREATE

### Priority 1: Core API Wrappers (src/airtable/)

#### `src/airtable/client.js`
Create Airtable client wrapper with:
- Initialize connection using AIRTABLE_PAT from .env
- Base reference for DJ_MANAGER_BASE_ID
- Error handling and retry logic
- Rate limit handling (5 requests/sec)

**Example structure**:
```javascript
import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PAT });
export const base = airtable.base(process.env.DJ_MANAGER_BASE_ID);

export const tables = {
  djBookings: base('DJ_Bookings'),
  timeSlots: base('Time_Slots'),
  eventMetrics: base('Event_Metrics'),
  eventSettings: base('Event_Settings')
};
```

#### `src/airtable/dj-bookings.js`
CRUD operations for DJ_Bookings table:
- `createBooking(djData)` - Create new DJ booking
- `getBookingById(id)` - Get single booking
- `getAllBookings(status?)` - Get all/filtered bookings
- `updateBookingStatus(id, status)` - Change status
- `confirmBooking(id)` - Mark as confirmed
- `markNoShow(id)` - Mark as no-show

#### `src/airtable/time-slots.js`
Operations for Time_Slots table:
- `createTimeSlot(slotData)` - Create slot
- `getAllSlots()` - Get all time slots
- `getAvailableSlots()` - Get slots where Assigned DJ is empty
- `assignDJToSlot(slotId, djId)` - Link DJ to slot
- `getSlotByTime(timeString)` - Find slot by time

#### `src/airtable/event-metrics.js`
Operations for Event_Metrics table:
- `createMetricEntry(metricsData)` - Create new metric
- `getLatestMetrics()` - Get most recent entry
- `getAllMetrics()` - Get all metrics for event
- `getMetricsByTimeSlot(slotId)` - Get metrics for specific slot

#### `src/airtable/automations.js`
Helper functions for automations:
- `sendBookingConfirmation(djId)` - Trigger confirmation
- `send48HourReminder()` - Send 48hr reminders
- `send24HourReminder()` - Send 24hr SMS reminders
- `send4HourReminder()` - Send day-of reminders

---

### Priority 2: Utility Functions (src/utils/)

#### `src/utils/logger.js`
Logging utility with chalk for colored output:
- `log.info(message)` - Info messages (blue)
- `log.success(message)` - Success (green)
- `log.warning(message)` - Warnings (yellow)
- `log.error(message)` - Errors (red)
- `log.debug(message)` - Debug mode only

#### `src/utils/validators.js`
Data validation functions:
- `validateDJData(data)` - Validate DJ booking data
- `validateTimeSlot(timeString)` - Validate time format
- `validateMetrics(data)` - Validate metric entry
- `validatePhone(phone)` - Validate phone number
- `validateEmail(email)` - Validate email

#### `src/utils/formatters.js`
Data formatting functions:
- `formatTimeSlot(start, end)` - Format time display
- `formatDJName(name)` - Capitalize properly
- `formatPhone(phone)` - Format phone to (XXX) XXX-XXXX
- `formatMetricsForDisplay(metrics)` - Pretty print metrics

---

### Priority 3: Automation Scripts (scripts/)

#### `scripts/populate-slots.js`
Populate Time_Slots table with all 12 time slots from 3pm-11pm.
**Reference**: `docs/COMPLETE_GUIDE.md` has the full time slot list.

#### `scripts/add-djs.js`
Add pre-confirmed DJs (Jae5, DJ Smoky, DJ Bomshel, DJ Gee Power).
**Reference**: `docs/EVENT_SCHEDULE.md` has the confirmed DJ list.

#### `scripts/test-api.js`
Test Airtable API connection:
- Check API key validity
- List all tables
- Count records in each table
- Display success/failure

#### `scripts/event-start.js`
Mark event as Active in Event_Settings:
- Update Event Status to "Active"
- Log start time
- Display current DJ lineup

#### `scripts/metrics-entry.js`
Interactive CLI for quick metrics entry:
- Use inquirer to prompt for:
  - Current time slot
  - Attendance level
  - Bar sales pace
  - Vibe check
- Submit to Event_Metrics table
- Display extension recommendation

#### `scripts/event-complete.js`
Mark event as Completed:
- Update Event Status to "Completed"
- Set Actual End Time
- Mark all DJs as "Completed"
- Generate summary stats

#### `scripts/generate-report.js`
Generate post-event analytics report:
- Total DJs booked
- No-show rate
- Peak attendance time
- Extension decision (yes/no)
- Total estimated attendance
- Export to JSON and Markdown

#### `scripts/dj-list.js`
List all DJs with their status:
- Display table with: Name, Slot, Status, Phone, Email
- Filter by status (confirmed, tentative, etc.)
- Color code by status

#### `scripts/dj-confirm.js`
Confirm a DJ booking:
- Accept DJ ID as argument
- Update status to "Confirmed"
- Link to Time_Slots
- Send confirmation

#### `scripts/dj-remind.js`
Send reminders based on timing:
- Check current date vs event date
- Send 48hr reminders (2 days before)
- Send 24hr reminders (1 day before)
- Send 4hr reminders (event day)

#### `scripts/export-data.js`
Export all data to CSV:
- Export DJ_Bookings to CSV
- Export Time_Slots to CSV
- Export Event_Metrics to CSV
- Save to `exports/` folder with timestamp

#### `scripts/analytics-report.js`
Generate detailed analytics:
- DJ performance by time slot
- Attendance trends throughout event
- Best performing music styles
- Extension decision analysis
- Recommendations for future events

---

### Priority 4: Tests (tests/)

#### `tests/api.test.js`
Test Airtable API connections:
- Test connection with valid/invalid API key
- Test CRUD operations on each table
- Test error handling

#### `tests/validators.test.js`
Test validation functions:
- Test email validation
- Test phone validation
- Test time slot validation

#### `tests/integration.test.js`
End-to-end integration tests:
- Test full booking flow
- Test metrics entry flow
- Test analytics generation

---

### Priority 5: Additional Documentation (docs/)

#### `docs/ARCHITECTURE.md`
Create comprehensive architecture document:
- System design diagram
- Data flow diagrams
- Table relationships
- API integration patterns
- Security considerations

#### `docs/API_REFERENCE.md`
API reference for all modules:
- Document all functions with parameters
- Include usage examples
- Show response formats
- List error codes

---

## 🎯 IMPLEMENTATION GUIDELINES

### Code Style
- Use ES modules (`import/export`)
- Use async/await (not callbacks)
- Use descriptive variable names
- Add JSDoc comments to all functions
- Handle errors gracefully

### Error Handling
```javascript
try {
  const result = await someFunction();
  log.success('Operation successful');
  return result;
} catch (error) {
  log.error(`Operation failed: ${error.message}`);
  throw error;
}
```

### CLI Interactions
Use inquirer for prompts, ora for spinners:
```javascript
import inquirer from 'inquirer';
import ora from 'ora';

const answers = await inquirer.prompt([
  {
    type: 'list',
    name: 'attendance',
    message: 'Current attendance level?',
    choices: ['Light', 'Moderate', 'Good', 'Packed', 'Over Capacity']
  }
]);

const spinner = ora('Submitting metrics...').start();
await submitMetrics(answers);
spinner.succeed('Metrics submitted!');
```

### Environment Variables
Always use environment variables for sensitive data:
```javascript
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.AIRTABLE_PAT;
if (!apiKey) {
  throw new Error('AIRTABLE_PAT not found in .env');
}
```

---

## 📦 CONFIG FILES TO CREATE

### `config/time-slots.json`
JSON array of all 12 time slots with:
```json
[
  {
    "slot": "3:00-4:00 PM",
    "start": "15:00",
    "end": "16:00",
    "duration": 60,
    "energy": "Early Warm Up",
    "order": 1
  },
  ...
]
```

### `config/pre-confirmed-djs.json`
JSON array of pre-confirmed DJs:
```json
[
  {
    "name": "Jae5",
    "slot": "5:45-6:30 PM",
    "status": "Confirmed",
    "musicStyle": ["Dancehall", "Afrobeats"]
  },
  ...
]
```

### `config/event-config.json`
Event configuration:
```json
{
  "eventName": "One Love Jamaica Relief",
  "eventDate": "2025-11-22",
  "venueName": "Mad Oak Bar",
  "venueAddress": "135 12th St, Oakland, CA"
}
```

---

## ✅ TESTING CHECKLIST

Before considering the implementation complete, test:

- [ ] API connection works with `.env` credentials
- [ ] All 12 time slots can be created
- [ ] Pre-confirmed DJs can be added
- [ ] DJ booking flow works end-to-end
- [ ] Metrics entry stores data correctly
- [ ] Extension formula works (attendance + sales + vibe)
- [ ] All scripts run without errors
- [ ] Data export to CSV works
- [ ] Analytics report generates correctly
- [ ] Error handling works for invalid data

---

## 🚀 SUCCESS CRITERIA

The system is complete when:

1. ✅ User can run `npm run setup` and populate all data
2. ✅ User can run `npm run dj:list` and see all DJs
3. ✅ User can run `npm run event:metrics` and submit metrics via CLI
4. ✅ Extension recommendation calculates correctly
5. ✅ User can run `npm run analytics:report` and get insights
6. ✅ All documentation is complete and accurate
7. ✅ All tests pass

---

## 💡 IMPLEMENTATION ORDER

Build in this order for best results:

1. **Core API Wrappers** (src/airtable/) - Foundation
2. **Utility Functions** (src/utils/) - Helpers
3. **Config Files** (config/) - Data definitions
4. **Setup Scripts** (populate-slots, add-djs) - Initial data
5. **Event Scripts** (event-start, metrics-entry, event-complete) - Event day ops
6. **DJ Scripts** (dj-list, dj-confirm, dj-remind) - DJ management
7. **Analytics Scripts** (export-data, analytics-report) - Post-event
8. **Tests** (tests/) - Validation
9. **Documentation** (docs/) - Architecture & API reference

---

## 📞 QUESTIONS TO ASK

If you're unsure about implementation details, ask:

1. **For data structures**: "What fields should be included in the DJ booking record?"
2. **For business logic**: "Should the extension recommendation require ALL criteria or just 2 out of 3?"
3. **For error handling**: "What should happen if a DJ double-books a time slot?"
4. **For user experience**: "Should the CLI show progress spinners for long operations?"

---

## 🎯 FINAL DELIVERABLE

When complete, the repository should have:

```
dj-set-manager-jcci/
├── README.md (✅ Done)
├── package.json (✅ Done)
├── .gitignore (✅ Done)
├── .env.example (✅ Done)
├── docs/
│   ├── ARCHITECTURE.md (🔨 Create)
│   ├── API_REFERENCE.md (🔨 Create)
│   ├── COMPLETE_GUIDE.md (✅ Done)
│   ├── QUICK_START.md (✅ Done)
│   ├── ORIGINAL_PRD.md (✅ Done)
│   └── EVENT_SCHEDULE.md (✅ Done)
├── scripts/
│   ├── setup.js (✅ Done)
│   ├── populate-slots.js (🔨 Create)
│   ├── add-djs.js (🔨 Create)
│   ├── test-api.js (🔨 Create)
│   ├── event-start.js (🔨 Create)
│   ├── metrics-entry.js (🔨 Create)
│   ├── event-complete.js (🔨 Create)
│   ├── generate-report.js (🔨 Create)
│   ├── dj-list.js (🔨 Create)
│   ├── dj-confirm.js (🔨 Create)
│   ├── dj-remind.js (🔨 Create)
│   ├── export-data.js (🔨 Create)
│   └── analytics-report.js (🔨 Create)
├── config/
│   ├── time-slots.json (🔨 Create)
│   ├── pre-confirmed-djs.json (🔨 Create)
│   └── event-config.json (🔨 Create)
├── src/
│   ├── airtable/
│   │   ├── client.js (🔨 Create)
│   │   ├── dj-bookings.js (🔨 Create)
│   │   ├── time-slots.js (🔨 Create)
│   │   ├── event-metrics.js (🔨 Create)
│   │   └── automations.js (🔨 Create)
│   └── utils/
│       ├── logger.js (🔨 Create)
│       ├── validators.js (🔨 Create)
│       └── formatters.js (🔨 Create)
└── tests/
    ├── api.test.js (🔨 Create)
    ├── validators.test.js (🔨 Create)
    └── integration.test.js (🔨 Create)
```

---

## 🚀 START HERE

Begin by:
1. Reading all documentation in `docs/`
2. Creating `src/airtable/client.js` (foundation)
3. Creating utility functions in `src/utils/`
4. Building config files in `config/`
5. Implementing scripts one by one in priority order

**Good luck! Build something amazing for Jamaica!** 🇯🇲

---

**Questions? Need clarification? Just ask!**
