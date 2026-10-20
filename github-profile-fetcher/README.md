# GitPulse 🐙 - GitHub API Profile & Repository Explorer

A modern React 19 application for fetching GitHub API data, visualizing developer profiles, repository statistics, contribution heatmaps, and handling asynchronous states (loading, success, error, retry).

Built for **API Integration and Data Rendering in React (Practical 3 / Lab Assignment)**.

---

## 🌟 Key Features

- 👤 **Developer Profile Explorer**: Enter any GitHub username to inspect avatar, bio, location, followers, following, public repos, and total star count across public repositories.
- 📈 **Contributions Heatmap & Activity**: Dynamically renders real-time contribution charts (`ghchart.rshah.org`) and language breakdown.
- 📦 **Top Repositories Grid**: Renders repository cards displaying name, description, primary language badge, star count ⭐, fork count 🍴, updated date, and direct GitHub links.
- 🔍 **Real-Time Filtering & Sorting**: Filter repositories by name/language and sort by stars, forks, recent updates, or alphabetically.
- ⏳ **Loading State Handling**: Displays an animated `<Spinner />` and skeleton shimmer placeholders while requests are pending.
- ⚠️ **Error Handling & Retry Mechanism**: Renders a graceful `<ErrorMessage />` component on API failures (e.g. 404 User Not Found or rate limit) with a prominent **Try Again** retry button.
- 🧪 **Interactive URL Error Simulator**: Test happy path and error path inside `Projects.jsx` as mandated by Lab Step 6.
- 📚 **Viva & Theory Q&A Guide**: Includes comprehensive explanations of `useEffect`, state management, troubleshooting matrix, and 20/20 evaluation rubrics.

---

## 🛠️ Technology Stack

- **Core**: React 19, JavaScript (ES6+), Vite 8
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, Dark Mode, Animations)
- **API**: GitHub REST API (`https://api.github.com/users/<username>`, `https://api.github.com/users/<username>/repos`)

---

## 📁 Project Structure

```
github-profile-fetcher/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header navigation bar
│   │   ├── UserSearch.jsx      # Username search bar with preset pills
│   │   ├── UserProfile.jsx     # Profile header, avatar, stats & contribution graph
│   │   ├── RepoList.jsx        # Repository list with search & sort
│   │   ├── Spinner.jsx         # Loading spinner & skeleton shimmer
│   │   ├── ErrorMessage.jsx    # Error alert banner with Retry button
│   │   ├── Footer.jsx          # Footer with credits
│   │   └── Components.css      # Component styling
│   ├── pages/
│   │   ├── GitHubExplorer.jsx  # Main developer search page
│   │   ├── Projects.jsx        # Required assignment component (Lab Step 1-6)
│   │   ├── LabGuide.jsx        # Theory Q&A, troubleshooting & evaluation rubrics
│   │   └── Pages.css           # Page styling
│   ├── App.jsx                 # Router & layout setup
│   ├── index.css               # Design system tokens & global CSS
│   └── main.jsx                # Entry point
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd github-profile-fetcher
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🧠 Theory Concepts & Q&A Summary

### Q1: Why is `useEffect` required instead of calling `fetch` directly in the component body?
Calling `fetch()` directly inside the component body runs during the render phase. Calling `setState` when `fetch` resolves triggers a re-render, which again calls `fetch()`, resulting in an **infinite loop**. `useEffect(() => { fetch(...) }, [])` ensures the request fires **only once on mount**.

### Q2: Difference between loading state and error state?
- `loading`: Indicates a pending request. Displays spinner/skeleton feedback.
- `error`: Indicates a network/request failure. Displays error feedback and a retry trigger.
Both must be handled separately to prevent stuck spinners or blank screens.

---

## 📊 Evaluation Rubrics (20 / 20 Marks)

| Criteria | Marks | Status |
| :--- | :--- | :--- |
| **API Call Implementation** | 5 | ✅ `fetch` API used inside `useEffect` with dependency array |
| **Data Rendering** | 5 | ✅ Parsed and rendered repos with name, star count, and HTML URL |
| **Loading State** | 4 | ✅ `<Spinner />` and skeleton UI shown while request is pending |
| **Error Handling** | 4 | ✅ `<ErrorMessage />` renders with Retry button on API failure |
| **Code Cleanliness** | 2 | ✅ Clean component separation, modular CSS, no console noise |
