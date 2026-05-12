# Task Management Client

אפליקציית React לניהול פרויקטים, משימות, תתי משימות ועובדים. הפרויקט מיועד לצד הלקוח ומתחבר לשרת C# דרך REST API באמצעות axios.

## יכולות מרכזיות

- הרשמה והתחברות משתמשים.
- שמירת token ושחזור משתמש אחרי רענון הדף.
- הפרדה בין משתמש רגיל למנהל.
- הגנה על דפים לפי התחברות והרשאה.
- לוח משימות למשתמש רגיל, כולל לקיחת משימה וצפייה בתתי משימות.
- פאנל מנהל לניהול פרויקטים, משימות, תתי משימות ועובדים.
- הצגת סטטיסטיקות וביצועי עובדים.
- ולידציה בטפסים, הודעות שגיאה, loading states והודעות הצלחה.
- ניהול state מרכזי באמצעות Redux Toolkit.
- ניתוב עמודים באמצעות React Router.

## טכנולוגיות

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router
- Axios
- ESLint

## דרישות מקדימות

- Node.js 20.19 ומעלה, או Node.js 22.12 ומעלה.
- שרת API פעיל בכתובת ברירת המחדל:

```text
http://localhost:5170/api
```

אפשר לשנות את כתובת השרת באמצעות קובץ `.env`.

## התקנה והרצה

```bash
npm install
npm run dev
```

בדיקת build:

```bash
npm run build
```

בדיקת lint:

```bash
npm run lint
```

## הגדרת API

צור קובץ `.env` בשורש הפרויקט במידת הצורך:

```env
VITE_API_URL=http://localhost:5170/api
```

קיים קובץ `.env.example` עם דוגמה להגדרה.

## מבנה הפרויקט

```text
src/
  components/
    admin/
    dashboard/
    my-tasks/
    ui/
  pages/
  services/
  store/
    slices/
  types/
```

## מסכים עיקריים

- `/login` - התחברות.
- `/register` - הרשמה.
- `/dashboard` - לוח משימות למשתמש רגיל.
- `/my-tasks` - המשימות שלי.
- `/profile` - פרטי המשתמש המחובר.
- `/admin` - פאנל ניהול למנהל בלבד.

## הערות

הפרויקט משתמש ב־JWT token שנשמר ב־localStorage ונשלח אוטומטית לכל בקשת API דרך axios interceptor.
