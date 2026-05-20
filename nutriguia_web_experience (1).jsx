import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Beef,
  Bot,
  Carrot,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Droplets,
  Egg,
  HeartPulse,
  Home,
  Leaf,
  MapPin,
  Mic,
  Milk,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Trash2,
  User,
  Wheat,
  WheatOff,
  X,
  Zap,
} from "lucide-react";

const EROSKI_RED = "#E30613";
const EROSKI_BLUE = "#0072BC";
const GREEN = "#087028";

const defaultProfile = {
  needs: ["iron"],
  diet: "omnivore",
  allergies: [],
  health: ["anemia"],
  budget: true,
  text: "",
};

const aisles = [
  { id: "legumbres", label: "Legumbres", icon: Leaf, bg: "#ECFDF3" },
  { id: "verduras", label: "Verduras", icon: Carrot, bg: "#DCFCE7" },
  { id: "lacteos", label: "Lácteos", icon: Milk, bg: "#E0F2FE" },
  { id: "desayunos", label: "Desayunos", icon: Wheat, bg: "#FEF3C7" },
  { id: "carnes", label: "Carnes", icon: Beef, bg: "#FFE4E6" },
  { id: "bebidas", label: "Bebidas", icon: Droplets, bg: "#DBEAFE" },
];

const needs = [
  { id: "weightLoss", label: "Perder peso", icon: Activity },
  { id: "protein", label: "Alto en proteína", icon: Beef },
  { id: "iron", label: "Rico en hierro", icon: Leaf },
  { id: "lowSugar", label: "Menos azúcar", icon: Droplets },
  { id: "lowSalt", label: "Menos sal", icon: HeartPulse },
  { id: "energy", label: "Más energía", icon: Zap },
  { id: "budget", label: "Económico", icon: CircleDollarSign },
  { id: "digestive", label: "Digestión ligera", icon: Activity },
];

const diets = [
  { id: "omnivore", label: "Sin preferencia", icon: User },
  { id: "vegetarian", label: "Vegetariano", icon: Leaf },
  { id: "vegan", label: "Vegano", icon: Leaf },
  { id: "halal", label: "Halal", icon: ShieldCheck },
];

const allergies = [
  { id: "gluten", label: "Gluten", icon: WheatOff },
  { id: "lactose", label: "Lactosa", icon: Milk },
  { id: "nuts", label: "Frutos secos", icon: Leaf },
  { id: "egg", label: "Huevo", icon: Egg },
  { id: "soy", label: "Soja", icon: Leaf },
  { id: "fish", label: "Pescado", icon: Droplets },
];

const health = [
  { id: "anemia", label: "Hierro bajo", icon: Leaf },
  { id: "diabetes", label: "Control azúcar", icon: Droplets },
  { id: "hypertension", label: "Poca sal", icon: HeartPulse },
  { id: "cholesterol", label: "Colesterol", icon: Activity },
  { id: "celiac", label: "Evitar gluten", icon: WheatOff },
  { id: "lactoseIntolerance", label: "Evitar lactosa", icon: Milk },
];

const products = [
  {
    id: "spinach",
    name: "Espinacas frescas Eroski",
    short: "Espinacas",
    aisle: "verduras",
    price: 1.29,
    size: "200 g",
    score: "A",
    color: "#15803D",
    color2: "#86EFAC",
    seed: "#16A34A",
    tags: ["Bajo en calorías", "Bajo azúcar", "Hierro", "Ligero"],
    allergens: [],
    traces: [],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Verduras · Isla refrigerada",
    why: "Opción muy ligera para perder peso. Aporta hierro con pocas calorías, aunque no debe ser la única fuente de proteína.",
    nutrition: { kcal: 23, protein: 2.9, fat: 0.4, saturated: 0.1, carbs: 3.6, sugar: 0.4, fiber: 2.2, iron: 2.7, salt: 0.08, calcium: 99, potassium: 558, magnesium: 79 },
    ingredients: "Espinaca fresca lavada.",
  },
  {
    id: "tofu",
    name: "Tofu natural Eroski Bio",
    short: "Tofu",
    aisle: "verduras",
    price: 2.25,
    size: "250 g",
    score: "A",
    color: "#0F766E",
    color2: "#CCFBF1",
    seed: "#F8FAFC",
    tags: ["Vegano", "Proteína", "Bajo azúcar", "Saciante"],
    allergens: ["soy"],
    traces: [],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Verduras · Refrigerado vegano",
    why: "Buena opción para perder peso si buscas proteína vegetal, saciedad y bajo azúcar. No apto si has marcado soja.",
    nutrition: { kcal: 124, protein: 13, fat: 7.5, saturated: 1.1, carbs: 1.2, sugar: 0.5, fiber: 1.1, iron: 2.4, salt: 0.04, calcium: 350, potassium: 120, magnesium: 42 },
    ingredients: "Agua, soja y coagulante. Contiene soja.",
  },
  {
    id: "yogurt",
    name: "Yogur natural alto en proteína",
    short: "Yogur pro",
    aisle: "lacteos",
    price: 1.65,
    size: "2 x 125 g",
    score: "B",
    color: "#38BDF8",
    color2: "#F8FAFC",
    seed: "#E0F2FE",
    tags: ["Proteína", "Ligero", "Rápido"],
    allergens: ["lactose"],
    traces: [],
    diets: ["omnivore", "vegetarian", "halal"],
    location: "Lácteos · Frío 1A",
    why: "Interesante para perder peso por su proteína y formato rápido. No apto para veganos ni para evitar lactosa.",
    nutrition: { kcal: 92, protein: 10, fat: 2, saturated: 1.3, carbs: 4, sugar: 3.8, fiber: 0, iron: 0.1, salt: 0.12, calcium: 150, potassium: 180, magnesium: 12 },
    ingredients: "Leche, fermentos lácticos y proteínas lácteas.",
  },
  {
    id: "lentils",
    name: "Lentejas pardinas Eroski",
    short: "Lentejas",
    aisle: "legumbres",
    price: 1.25,
    size: "500 g",
    score: "A",
    color: "#166534",
    color2: "#22C55E",
    seed: "#3F2E20",
    tags: ["Hierro", "Fibra", "Proteína vegetal", "Saciante"],
    allergens: [],
    traces: ["Puede contener gluten"],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Pasillo Legumbres · Estante 3B",
    why: "Muy buena para hierro, fibra y saciedad. Para perder peso conviene controlar la ración porque aporta más calorías que verduras o yogur.",
    nutrition: { kcal: 320, protein: 24, fat: 1.8, saturated: 0.3, carbs: 48, sugar: 1.2, fiber: 18, iron: 7.1, salt: 0.02, calcium: 56, potassium: 677, magnesium: 47 },
    ingredients: "Lenteja pardina. Sin sal añadida.",
  },
  {
    id: "chickpeas",
    name: "Garbanzos Eroski",
    short: "Garbanzos",
    aisle: "legumbres",
    price: 1.15,
    size: "1 kg",
    score: "A",
    color: "#D97706",
    color2: "#FDE68A",
    seed: "#E8B96D",
    tags: ["Económico", "Hierro", "Fibra", "Saciante"],
    allergens: [],
    traces: [],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Pasillo Legumbres · Estante 4A",
    why: "Opción económica y saciante. Para pérdida de peso es útil, pero con ración moderada por su carga energética.",
    nutrition: { kcal: 364, protein: 19, fat: 6, saturated: 0.6, carbs: 61, sugar: 10.7, fiber: 17, iron: 6.2, salt: 0.03, calcium: 105, potassium: 875, magnesium: 115 },
    ingredients: "Garbanzo seco.",
  },
  {
    id: "oats",
    name: "Copos de avena integral",
    short: "Avena",
    aisle: "desayunos",
    price: 1.48,
    size: "500 g",
    score: "A",
    color: "#D97706",
    color2: "#FEF3C7",
    seed: "#FDE68A",
    tags: ["Energía", "Fibra", "Bajo azúcar"],
    allergens: ["gluten"],
    traces: ["Puede contener frutos secos"],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Desayunos · Estante 5C",
    why: "Buena para energía sostenida. Para perder peso puede servir en desayuno medido, pero no es la opción más ligera.",
    nutrition: { kcal: 370, protein: 13, fat: 7, saturated: 1.2, carbs: 60, sugar: 1, fiber: 10, iron: 4.2, salt: 0.01, calcium: 54, potassium: 429, magnesium: 177 },
    ingredients: "Copos de avena integral.",
  },
  {
    id: "water",
    name: "Agua mineral Eroski",
    short: "Agua",
    aisle: "bebidas",
    price: 0.62,
    size: "1,5 L",
    score: "A",
    color: "#0284C7",
    color2: "#DBEAFE",
    seed: "#BFDBFE",
    tags: ["Sin azúcar", "Sin calorías", "Hidratación", "Ligero"],
    allergens: [],
    traces: [],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Bebidas · Agua mineral",
    why: "Es la mejor opción dentro de bebidas si el objetivo es perder peso, controlar azúcar o evitar calorías líquidas.",
    nutrition: { kcal: 0, protein: 0, fat: 0, saturated: 0, carbs: 0, sugar: 0, fiber: 0, iron: 0, salt: 0.01, calcium: 6, potassium: 1, magnesium: 2 },
    ingredients: "Agua mineral natural.",
  },
  {
    id: "soy-drink",
    name: "Bebida de soja sin azúcar",
    short: "Soja s/a",
    aisle: "bebidas",
    price: 1.35,
    size: "1 L",
    score: "B",
    color: "#0F766E",
    color2: "#CCFBF1",
    seed: "#F8FAFC",
    tags: ["Vegano", "Sin lactosa", "Proteína", "Sin azúcar"],
    allergens: ["soy"],
    traces: [],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Bebidas · Bebidas vegetales",
    why: "Tiene más interés nutricional que un refresco porque aporta algo de proteína y no contiene lactosa. No apta si marcas soja.",
    nutrition: { kcal: 33, protein: 3.2, fat: 1.8, saturated: 0.3, carbs: 0.4, sugar: 0.2, fiber: 0.6, iron: 0.6, salt: 0.12, calcium: 120, potassium: 90, magnesium: 18 },
    ingredients: "Agua, habas de soja y estabilizante. Contiene soja.",
  },
  {
    id: "orange-juice",
    name: "Zumo de naranja exprimido",
    short: "Zumo",
    aisle: "bebidas",
    price: 2.15,
    size: "750 ml",
    score: "C",
    color: "#F97316",
    color2: "#FED7AA",
    seed: "#FDBA74",
    tags: ["Vitamina C", "Azúcar natural", "Sin lactosa"],
    allergens: [],
    traces: [],
    diets: ["omnivore", "vegetarian", "vegan", "halal"],
    location: "Bebidas · Zumos refrigerados",
    why: "Puede encajar si buscas sabor o vitamina C, pero para perder peso o controlar azúcar queda por debajo del agua y la bebida de soja sin azúcar.",
    nutrition: { kcal: 45, protein: 0.7, fat: 0.1, saturated: 0, carbs: 10, sugar: 9.2, fiber: 0.2, iron: 0.1, salt: 0.01, calcium: 11, potassium: 200, magnesium: 10 },
    ingredients: "Zumo de naranja exprimido.",
  },
  {
    id: "chicken",
    name: "Pechuga de pollo fileteada",
    short: "Pollo",
    aisle: "carnes",
    price: 4.95,
    size: "500 g",
    score: "A",
    color: "#FB7185",
    color2: "#FFE4E6",
    seed: "#FDA4AF",
    tags: ["Alto en proteína", "Bajo en azúcar", "Saciante", "Bajo en grasa"],
    allergens: [],
    traces: [],
    diets: ["omnivore", "halal"],
    location: "Carnes · Refrigerado",
    why: "Muy útil para perder peso si buscas proteína alta y bajo azúcar. No encaja con dieta vegetariana o vegana.",
    nutrition: { kcal: 110, protein: 23, fat: 1.5, saturated: 0.4, carbs: 0, sugar: 0, fiber: 0, iron: 0.7, salt: 0.12, calcium: 11, potassium: 256, magnesium: 27 },
    ingredients: "Pechuga de pollo.",
  },
  {
    id: "turkey",
    name: "Pavo en lonchas bajo en sal",
    short: "Pavo",
    aisle: "carnes",
    price: 2.35,
    size: "150 g",
    score: "B",
    color: "#F43F5E",
    color2: "#FFE4E6",
    seed: "#FDA4AF",
    tags: ["Proteína", "Rápido", "Bajo en grasa"],
    allergens: [],
    traces: ["Puede contener leche"],
    diets: ["omnivore", "halal"],
    location: "Carnes · Charcutería refrigerada",
    why: "Opción rápida con proteína, aunque menos limpia que la pechuga fresca. Conviene revisar sal y trazas si hay restricciones.",
    nutrition: { kcal: 98, protein: 19, fat: 1.8, saturated: 0.5, carbs: 1.5, sugar: 0.8, fiber: 0, iron: 0.5, salt: 0.8, calcium: 12, potassium: 210, magnesium: 20 },
    ingredients: "Pavo, agua, sal y conservador.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function money(value) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

function label(list, id) {
  const found = list.find((item) => item.id === id);
  return found ? found.label : id;
}

function conflicts(product, profile) {
  const result = [];
  product.allergens.forEach((allergen) => {
    if (profile.allergies.includes(allergen)) result.push("Contiene " + label(allergies, allergen).toLowerCase());
  });
  if (profile.diet !== "omnivore" && !product.diets.includes(profile.diet)) result.push("No encaja con " + label(diets, profile.diet).toLowerCase());
  if (profile.health.includes("celiac") && product.allergens.includes("gluten")) result.push("No apto sin gluten");
  if (profile.health.includes("lactoseIntolerance") && product.allergens.includes("lactose")) result.push("No apto sin lactosa");
  return result;
}

function aiScore(product, profile, selectedAisle) {
  if (conflicts(product, profile).length > 0) return 0;
  const n = product.nutrition;
  let score = 55;
  if (product.aisle === selectedAisle) score += 8;
  if (profile.budget) score += Math.max(0, 10 - product.price * 3);
  if (profile.needs.includes("weightLoss")) score += (n.kcal <= 150 ? 20 : n.kcal <= 330 ? 7 : -8) + (n.protein >= 10 ? 7 : 0) + (n.fiber >= 5 ? 5 : 0) + (n.sugar <= 3 ? 4 : -4);
  if (profile.needs.includes("protein")) score += n.protein * 0.5;
  if (profile.needs.includes("iron") || profile.health.includes("anemia")) score += n.iron * 2;
  if (profile.needs.includes("lowSugar") || profile.health.includes("diabetes")) score += n.sugar <= 3 ? 12 : -8;
  if (profile.needs.includes("lowSalt") || profile.health.includes("hypertension")) score += n.salt <= 0.12 ? 8 : -6;
  if (profile.health.includes("cholesterol")) score += n.saturated <= 1.3 ? 6 : -4;
  return Math.max(1, Math.min(99, Math.round(score)));
}

function EroskiLogo({ small = false }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-white px-2 py-1 shadow-sm ring-1 ring-zinc-200">
      <span className={cn("grid place-items-center rounded font-black text-white", small ? "h-4 w-4 text-[8px]" : "h-5 w-5 text-[10px]")} style={{ background: EROSKI_BLUE }}>e</span>
      <span className={cn("rounded font-black text-white", small ? "px-1 py-0.5 text-[8px]" : "px-1.5 py-0.5 text-[10px]")} style={{ background: EROSKI_RED }}>EROSKI</span>
    </div>
  );
}

function AppLogo({ compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
        <Leaf size={21} className="text-emerald-700" />
      </div>
      {!compact && (
        <div>
          <div className="text-2xl font-black tracking-[-0.04em] text-emerald-800">NutriguIA</div>
          <div className="-mt-1 text-[11px] font-semibold tracking-wide text-zinc-500">Smart Shopping Assistant</div>
        </div>
      )}
    </div>
  );
}

function Phone({ children }) {
  return (
    <div className="relative mx-auto h-[812px] w-full max-w-[390px] overflow-hidden rounded-[46px] border border-white bg-white shadow-[0_45px_110px_rgba(15,23,42,.22)] ring-1 ring-zinc-200">
      <div className="absolute left-1/2 top-3 z-50 h-6 w-28 -translate-x-1/2 rounded-full bg-zinc-950" />
      {children}
    </div>
  );
}

function Header({ title, back, close }) {
  return (
    <div className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 px-5 pb-3 pt-10 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          {back && <button onClick={back} className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100"><ArrowLeft size={18} /></button>}
          <AppLogo compact />
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">NutriguIA</div>
            <div className="truncate text-sm font-black text-zinc-950">{title}</div>
          </div>
        </div>
        {close ? <button onClick={close} className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100"><X size={18} /></button> : <EroskiLogo small />}
      </div>
    </div>
  );
}

function Score({ score, small = false }) {
  const colors = { A: "#079455", B: "#84CC16", C: "#FACC15", D: "#F97316", E: "#EF4444" };
  return (
    <div className="flex gap-1">
      {["A", "B", "C", "D", "E"].map((letter) => {
        const active = score === letter;
        return <span key={letter} className={cn("grid place-items-center rounded-full font-black", small ? "h-5 w-5 text-[10px]" : "h-9 w-9 text-sm")} style={{ background: active ? colors[letter] : "#F3F4F6", color: active ? "white" : "#A1A1AA" }}>{letter}</span>;
      })}
    </div>
  );
}

function ProductImage({ product, big = false, mini = false }) {
  const height = mini ? 64 : big ? 250 : 145;
  const width = mini ? 44 : big ? 120 : 76;
  const packHeight = mini ? 54 : big ? 170 : 112;
  const dots = mini ? 8 : big ? 28 : 16;
  return (
    <div className="relative overflow-hidden rounded-[28px]" style={{ height, background: "linear-gradient(135deg," + product.color + "," + product.color2 + ")" }}>
      <div className="absolute left-1/2 top-1/2 overflow-hidden rounded-[20px] bg-white shadow-2xl ring-1 ring-black/5" style={{ width, height: packHeight, transform: "translate(-50%,-50%)" }}>
        <div className="h-5" style={{ background: GREEN }} />
        <div className="p-2">
          <EroskiLogo small />
          <div className={cn("mt-2 font-black leading-none text-zinc-900", big ? "text-lg" : "text-[11px]")}>{product.short}</div>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {Array.from({ length: dots }).map((_, index) => <span key={index} className="rounded-full" style={{ width: big ? 12 : 7, height: big ? 12 : 7, background: product.seed }} />)}
          </div>
        </div>
      </div>
      {!mini && <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-zinc-800">{product.score}</div>}
    </div>
  );
}

function Chip({ item, active, danger, onClick }) {
  const Icon = item.icon;
  const activeClass = danger ? "border-red-500 bg-red-500 text-white" : "border-emerald-700 bg-emerald-700 text-white";
  return (
    <button onClick={onClick} className={cn("flex items-center gap-2 rounded-2xl border px-3 py-3 text-left text-[12px] font-black", active ? activeClass : "border-zinc-200 bg-white text-zinc-700")}> 
      <Icon size={15} /> {item.label}
    </button>
  );
}

function BottomNav({ active, go, count }) {
  const items = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "results", label: "Explorar", icon: Search },
    { id: "list", label: "Lista", icon: ShoppingBasket },
    { id: "profile", label: "Perfil", icon: User },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-zinc-100 bg-white/90 px-5 pb-4 pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const selected = active === item.id;
          return (
            <button key={item.id} onClick={() => go(item.id)} className="relative flex flex-col items-center gap-1 rounded-2xl py-2">
              <Icon size={19} className={selected ? "text-emerald-700" : "text-zinc-400"} />
              <span className={selected ? "text-[11px] font-black text-emerald-700" : "text-[11px] font-semibold text-zinc-500"}>{item.label}</span>
              {item.id === "list" && count > 0 && <span className="absolute right-5 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-emerald-600 px-1 text-[10px] font-black text-white">{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HomeScreen({ selectedAisle, setSelectedAisle, next }) {
  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-14">
      <div className="mb-8 flex items-center justify-between"><AppLogo /><EroskiLogo /></div>
      <h1 className="text-center text-3xl font-black tracking-[-0.05em]">¿Dónde estás?</h1>
      <p className="mt-2 text-center text-sm leading-6 text-zinc-500">Elige un pasillo para ordenar las recomendaciones.</p>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {aisles.map((aisle) => {
          const Icon = aisle.icon;
          const active = selectedAisle === aisle.id;
          return (
            <button key={aisle.id} onClick={() => setSelectedAisle(aisle.id)} className={cn("min-h-[112px] rounded-[28px] border p-4 text-center shadow-sm", active ? "border-emerald-600 ring-4 ring-emerald-50" : "border-zinc-200")} style={{ background: aisle.bg }}>
              <div className={cn("mx-auto grid h-12 w-12 place-items-center rounded-2xl", active ? "bg-emerald-700 text-white" : "bg-white text-zinc-700")}><Icon size={23} /></div>
              <div className="mt-3 text-sm font-black">{aisle.label}</div>
            </button>
          );
        })}
      </div>
      <button onClick={next} className="mt-7 flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-700 py-4 text-sm font-black text-white shadow-xl shadow-emerald-100">Continuar <ChevronRight size={18} /></button>
    </div>
  );
}

function Section({ title, note, children }) {
  return (
    <section className="mt-7">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-zinc-900">{title}</h2>
        {note && <span className="text-[11px] font-black text-red-500">{note}</span>}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">{children}</div>
    </section>
  );
}

function NeedsScreen({ profile, setProfile, next, aisleName }) {
  function toggle(field, id) {
    setProfile((prev) => {
      const current = prev[field];
      const nextValue = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      return { ...prev, [field]: nextValue };
    });
  }

  function voicePreset() {
    setProfile({
      ...profile,
      text: "Quiero perder peso, tomar proteína y evitar lactosa",
      needs: Array.from(new Set([...profile.needs, "weightLoss", "protein"])),
      allergies: Array.from(new Set([...profile.allergies, "lactose"])),
    });
  }

  return (
    <div className="h-full overflow-y-auto bg-white pb-28">
      <Header title={aisleName} />
      <div className="px-5 pt-7">
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-3xl bg-emerald-50 text-emerald-700"><Sparkles size={22} /></div>
          <h1 className="text-3xl font-black tracking-[-0.05em]">¿Qué necesitas?</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-500">Incluye perder peso, dieta, alergias y salud.</p>
        </div>
        <div className="mt-7 rounded-[30px] border border-zinc-200 bg-zinc-50 p-4">
          <textarea value={profile.text} onChange={(e) => setProfile({ ...profile, text: e.target.value })} placeholder="Ej: quiero perder peso, soy vegano, sin lactosa..." className="h-24 w-full resize-none bg-transparent text-sm font-semibold outline-none" />
          <button onClick={voicePreset} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-3 text-xs font-black text-white"><Mic size={15} /> Simular voz</button>
        </div>
        <Section title="Necesidad principal">
          {needs.map((item) => <Chip key={item.id} item={item} active={profile.needs.includes(item.id)} onClick={() => toggle("needs", item.id)} />)}
        </Section>
        <Section title="Preferencia alimentaria">
          {diets.map((item) => <Chip key={item.id} item={item} active={profile.diet === item.id} onClick={() => setProfile({ ...profile, diet: item.id })} />)}
        </Section>
        <Section title="Alergias o intolerancias" note="filtro estricto">
          {allergies.map((item) => <Chip key={item.id} item={item} active={profile.allergies.includes(item.id)} danger onClick={() => toggle("allergies", item.id)} />)}
        </Section>
        <Section title="Salud">
          {health.map((item) => <Chip key={item.id} item={item} active={profile.health.includes(item.id)} onClick={() => toggle("health", item.id)} />)}
        </Section>
        <div className="mt-5 rounded-[26px] border border-amber-100 bg-amber-50 p-4 text-[12px] leading-5 text-amber-900">
          <div className="flex items-center gap-2 font-black"><AlertTriangle size={15} /> Información orientativa</div>
          <p className="mt-1 font-semibold">En alergias o enfermedades, revisa siempre el etiquetado real.</p>
        </div>
        <button onClick={next} className="mt-7 w-full rounded-3xl bg-emerald-700 py-4 text-sm font-black text-white shadow-xl shadow-emerald-100">Generar recomendación IA</button>
      </div>
    </div>
  );
}

function ProductCard({ product, profile, selectedAisle, onAdd, onDetail, onCompare, onMap }) {
  const bad = conflicts(product, profile);
  const safe = bad.length === 0;
  const near = product.aisle === selectedAisle;
  return (
    <div className={cn("rounded-[32px] border bg-white p-3 shadow-sm", safe ? "border-zinc-100" : "border-red-200 ring-2 ring-red-50")}>
      <button onClick={() => onDetail(product)} className="w-full text-left">
        <ProductImage product={product} />
        <div className="mt-4 flex justify-between gap-3">
          <div>
            <h3 className="text-[16px] font-black leading-tight">{product.name}</h3>
            <p className="mt-1 text-[12px] font-semibold text-zinc-500">{product.size} · {near ? "en tu pasillo" : "cerca"}</p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-50 text-[11px] font-black text-emerald-800">{product.aiScore}%</div>
        </div>
      </button>
      <div className="mt-3 flex items-center justify-between"><div className="text-xl font-black">{money(product.price)}</div><Score score={product.score} small /></div>
      <div className="mt-3 flex flex-wrap gap-1.5">{product.tags.map((tag) => <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-black text-zinc-600">{tag}</span>)}</div>
      <div className={cn("mt-3 rounded-2xl px-3 py-2 text-[11px] font-black", safe ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700")}>{safe ? "Apto según tus filtros" : bad.join(" · ")}</div>
      <p className="mt-3 text-[12px] leading-5 text-zinc-500">{product.why}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button disabled={!safe} onClick={() => onAdd(product)} className={cn("rounded-2xl py-3 text-[12px] font-black", safe ? "bg-emerald-700 text-white" : "bg-zinc-100 text-zinc-400")}>Añadir</button>
        <button onClick={() => onCompare(product)} className="rounded-2xl bg-zinc-100 py-3 text-[12px] font-black">Comparar</button>
        <button onClick={() => onMap(product)} className="rounded-2xl bg-zinc-950 py-3 text-[12px] font-black text-white">Ubicar</button>
      </div>
    </div>
  );
}

function ResultsScreen({ items, profile, selectedAisle, aisleName, onAdd, onDetail, onCompare, onMap, onList, onAll }) {
  const safeCount = items.filter((p) => conflicts(p, profile).length === 0).length;
  const lowest = items.length ? Math.min(...items.map((p) => p.price)) : 0;
  const chips = [...profile.needs.map((id) => label(needs, id)), label(diets, profile.diet), ...profile.allergies.map((id) => "Sin " + label(allergies, id))].slice(0, 5);
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-white via-zinc-50 to-white pb-28">
      <Header title={aisleName} />
      <div className="px-5 pt-5">
        <div className="rounded-[32px] bg-zinc-950 p-5 text-white shadow-2xl shadow-zinc-300">
          <div className="flex gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-3xl bg-white/10"><Sparkles size={22} className="text-emerald-300" /></div>
            <div>
              <div className="text-sm font-black">Recomendación IA segura</div>
              <p className="mt-2 text-sm leading-6 text-white/75">Filtrado por nutrición, perder peso, dieta, alergias y ubicación.</p>
              <div className="mt-3 flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold">{chip}</span>)}</div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Mini value={safeCount} label="aptas" />
          <Mini value="A" label="mejor score" green />
          <Mini value={money(lowest)} label="mínimo" />
        </div>
        <div className="mb-4 mt-7 flex items-end justify-between">
          <div><h2 className="text-2xl font-black tracking-[-0.04em]">Recomendados</h2><p className="mt-1 text-sm text-zinc-500">Ordenados por objetivo y seguridad.</p></div>
          <button onClick={onAll} className="text-[12px] font-black text-emerald-700">Ver todos</button>
        </div>
        <div className="grid gap-4">{items.map((p) => <ProductCard key={p.id} product={p} profile={profile} selectedAisle={selectedAisle} onAdd={onAdd} onDetail={onDetail} onCompare={onCompare} onMap={onMap} />)}</div>
        <button onClick={onList} className="mt-6 flex w-full items-center justify-center gap-2 rounded-3xl border border-emerald-100 bg-emerald-50 py-4 text-sm font-black text-emerald-800">Ver lista inteligente <ChevronRight size={17} /></button>
      </div>
    </div>
  );
}

function Mini({ value, label, green }) {
  return <div className="rounded-[24px] bg-white p-3 text-center shadow-sm ring-1 ring-zinc-100"><div className={cn("text-xl font-black", green ? "text-emerald-700" : "text-zinc-950")}>{value}</div><div className="text-[10px] font-bold text-zinc-400">{label}</div></div>;
}

function DetailScreen({ product, profile, back, add, compare, map }) {
  const bad = conflicts(product, profile);
  const safe = bad.length === 0;
  const n = product.nutrition;
  const nutrients = [
    ["Calorías", n.kcal, "kcal"], ["Proteínas", n.protein, "g"], ["Grasas", n.fat, "g"], ["Saturadas", n.saturated, "g"], ["Hidratos", n.carbs, "g"], ["Azúcar", n.sugar, "g"], ["Fibra", n.fiber, "g"], ["Hierro", n.iron, "mg"], ["Sal", n.salt, "g"], ["Calcio", n.calcium, "mg"], ["Potasio", n.potassium, "mg"], ["Magnesio", n.magnesium, "mg"],
  ];
  return (
    <div className="h-full overflow-y-auto bg-white pb-28">
      <Header title="Detalle nutricional" back={back} />
      <div className="px-5 pt-5">
        <ProductImage product={product} big />
        <div className="mt-6 flex justify-between gap-4"><div><h1 className="text-3xl font-black leading-tight tracking-[-0.05em]">{product.name}</h1><p className="mt-1 text-sm font-semibold text-zinc-500">{product.location}</p></div><div className="text-2xl font-black">{money(product.price)}</div></div>
        <div className={cn("mt-5 rounded-[28px] border p-4", safe ? "border-emerald-100 bg-emerald-50" : "border-red-100 bg-red-50")}><div className="flex items-center gap-2 text-sm font-black"><CheckCircle2 size={17} /> {safe ? "Compatible" : "No recomendado"}</div><p className="mt-2 text-[12px] font-semibold">{safe ? "No se detectan conflictos." : bad.join(" · ")}</p></div>
        <div className="mt-5 rounded-[28px] bg-zinc-50 p-4"><div className="mb-3 text-sm font-black">Nutri-Score</div><Score score={product.score} /></div>
        <div className="mt-6 rounded-[32px] bg-zinc-950 p-5 text-white"><div className="flex items-center gap-2 text-sm font-black"><Sparkles size={17} className="text-emerald-300" /> ¿Por qué?</div><p className="mt-3 text-sm leading-6 text-white/75">{product.why}</p></div>
        <h2 className="mt-7 text-xl font-black">Información nutricional</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">{nutrients.map(([name, value, unit]) => <div key={name} className="rounded-[24px] border border-zinc-100 bg-white p-4 shadow-sm"><div className="text-[12px] font-bold text-zinc-500">{name}</div><div className="mt-1 text-xl font-black">{value}<span className="ml-1 text-xs text-zinc-500">{unit}</span></div></div>)}</div>
        <h2 className="mt-7 text-xl font-black">Alérgenos e ingredientes</h2>
        <div className="mt-4 rounded-[28px] bg-zinc-50 p-4"><div className="text-sm font-black">Alérgenos</div><p className="mt-1 text-[12px] font-semibold text-zinc-600">{product.allergens.length ? product.allergens.map((id) => label(allergies, id)).join(" · ") : "Sin alérgenos principales declarados"}</p><div className="mt-4 text-sm font-black">Trazas</div><p className="mt-1 text-[12px] font-semibold text-zinc-600">{product.traces.length ? product.traces.join(" · ") : "Sin trazas indicadas"}</p><div className="mt-4 text-sm font-black">Ingredientes</div><p className="mt-1 text-[12px] font-semibold text-zinc-600">{product.ingredients}</p></div>
        <div className="mt-6 grid grid-cols-3 gap-2"><button disabled={!safe} onClick={() => add(product)} className={cn("rounded-2xl py-3 text-[12px] font-black", safe ? "bg-emerald-700 text-white" : "bg-zinc-100 text-zinc-400")}>Añadir</button><button onClick={() => compare(product)} className="rounded-2xl bg-zinc-100 py-3 text-[12px] font-black">Comparar</button><button onClick={() => map(product)} className="rounded-2xl bg-zinc-950 py-3 text-[12px] font-black text-white">Ubicar</button></div>
      </div>
    </div>
  );
}

function CompareScreen({ items, profile, back, add }) {
  const chosen = items.slice(0, 3);
  const rows = [["Precio", "price", "min", 3], ["Proteína", "protein", "max", 25], ["Calorías", "kcal", "min", 400], ["Azúcar", "sugar", "min", 12], ["Sal", "salt", "min", 0.3], ["Hierro", "iron", "max", 8], ["Fibra", "fiber", "max", 20]];
  const getValue = (p, key) => key === "price" ? p.price : p.nutrition[key];
  const isBest = (p, key, mode) => {
    const values = chosen.map((x) => getValue(x, key));
    return mode === "min" ? getValue(p, key) === Math.min(...values) : getValue(p, key) === Math.max(...values);
  };
  const bestSafe = chosen.find((p) => conflicts(p, profile).length === 0) || chosen[0];
  return (
    <div className="h-full overflow-y-auto bg-white pb-28">
      <Header title="Comparador" back={back} />
      <div className="px-5 pt-5">
        <div className="rounded-[32px] bg-zinc-950 p-5 text-white"><div className="text-sm font-black">Mejor opción IA</div><p className="mt-2 text-sm leading-6 text-white/75">{bestSafe.name} es la primera opción compatible.</p></div>
        <div className="mt-5 grid grid-cols-3 gap-2">{chosen.map((p) => <div key={p.id} className="rounded-[24px] bg-zinc-50 p-2 text-center ring-1 ring-zinc-100"><ProductImage product={p} mini /><div className="mt-2 text-[11px] font-black">{p.short}</div><div className={cn("mt-2 rounded-full px-2 py-1 text-[9px] font-black", conflicts(p, profile).length ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-800")}>{conflicts(p, profile).length ? "Evitar" : "Apto"}</div></div>)}</div>
        <div className="mt-5 overflow-hidden rounded-[28px] border border-zinc-100">{rows.map(([rowLabel, key, mode, max]) => <div key={key} className="grid grid-cols-[1fr_repeat(3,1fr)] gap-1 border-b border-zinc-100 px-3 py-3 last:border-b-0"><div className="text-[12px] font-black">{rowLabel}</div>{chosen.map((p) => { const value = getValue(p, key); const best = isBest(p, key, mode); const width = Math.min(100, (value / max) * 100); return <div key={p.id + key} className={cn("rounded-2xl px-2 py-2 text-center text-[12px] font-black", best ? "bg-emerald-50 text-emerald-800" : "text-zinc-600")}>{key === "price" ? money(value) : value}<div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-100"><div className={cn("h-full rounded-full", best ? "bg-emerald-600" : "bg-zinc-400")} style={{ width: width + "%" }} /></div></div>; })}</div>)}</div>
        <button onClick={() => add(bestSafe)} className="mt-6 w-full rounded-3xl bg-emerald-700 py-4 text-sm font-black text-white">Añadir opción apta</button>
      </div>
    </div>
  );
}

function MapScreen({ product, back }) {
  return (
    <div className="h-full overflow-y-auto bg-white pb-28">
      <Header title="Navegación" back={back} />
      <div className="px-5 pt-5">
        <div className="rounded-[32px] bg-zinc-50 p-5 ring-1 ring-zinc-100"><h1 className="text-2xl font-black">{product.name}</h1><p className="mt-2 text-sm font-semibold text-zinc-500">{product.location}</p></div>
        <div className="relative mt-6 h-[360px] overflow-hidden rounded-[36px] bg-gradient-to-br from-zinc-100 to-white p-5 ring-1 ring-zinc-100"><div className="absolute inset-x-6 top-10 grid grid-cols-4 gap-3 opacity-85">{Array.from({ length: 16 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white shadow-sm" />)}</div><div className="absolute left-[95px] top-[90px] h-[155px] border-l-2 border-dashed border-emerald-700" /><div className="absolute left-[95px] top-[245px] w-[135px] border-t-2 border-dashed border-emerald-700" /><motion.div className="absolute left-[222px] top-[218px] grid h-[60px] w-[60px] place-items-center rounded-full bg-emerald-700 text-white shadow-2xl shadow-emerald-200" animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><MapPin size={28} /></motion.div><div className="absolute left-[70px] top-[62px] rounded-full bg-white px-3 py-1 text-[11px] font-black text-emerald-800 shadow-sm">Estás aquí</div></div>
        <div className="mt-5 rounded-[30px] bg-zinc-950 p-5 text-white"><div className="flex items-center gap-2 text-xl font-black"><Navigation size={22} className="text-emerald-300" /> 2 pasillos a la derecha</div><p className="mt-2 text-sm leading-6 text-white/70">Avanza recto y gira a la derecha.</p></div>
      </div>
    </div>
  );
}

function ListScreen({ cart, setCart, back }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const protein = cart.reduce((sum, item) => sum + item.nutrition.protein * item.qty, 0);
  const iron = cart.reduce((sum, item) => sum + item.nutrition.iron * item.qty, 0);
  const fiber = cart.reduce((sum, item) => sum + item.nutrition.fiber * item.qty, 0);
  const changeQty = (id, amount) => setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + amount) } : item));
  const remove = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  return (
    <div className="h-full overflow-y-auto bg-white pb-28">
      <Header title="Lista inteligente" back={back} />
      <div className="px-5 pt-5">
        <div className="rounded-[34px] bg-gradient-to-br from-emerald-700 to-emerald-950 p-5 text-white"><div className="text-sm font-bold text-white/75">Total estimado</div><div className="mt-1 text-4xl font-black">{money(total)}</div><div className="mt-4 grid grid-cols-3 gap-2"><span className="rounded-2xl bg-white/15 px-2 py-2 text-center text-[11px] font-bold">{protein.toFixed(1)}g prot.</span><span className="rounded-2xl bg-white/15 px-2 py-2 text-center text-[11px] font-bold">{iron.toFixed(1)}mg Fe</span><span className="rounded-2xl bg-white/15 px-2 py-2 text-center text-[11px] font-bold">{fiber.toFixed(1)}g fibra</span></div></div>
        <div className="mt-6 space-y-3">{cart.length === 0 ? <div className="rounded-[30px] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center"><ShoppingBasket className="mx-auto text-zinc-300" size={38} /><div className="mt-3 text-sm font-black">Tu lista está vacía</div></div> : cart.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-[28px] border border-zinc-100 bg-white p-3 shadow-sm"><div className="h-16 w-16 overflow-hidden rounded-2xl"><ProductImage product={item} mini /></div><div className="min-w-0 flex-1"><div className="truncate text-sm font-black">{item.name}</div><div className="mt-1 text-[12px] text-zinc-500">{money(item.price)}</div></div><div className="flex items-center gap-1 rounded-2xl bg-zinc-100 p-1"><button onClick={() => changeQty(item.id, -1)} className="grid h-8 w-8 place-items-center rounded-xl bg-white"><Minus size={14} /></button><span className="w-6 text-center text-sm font-black">{item.qty}</span><button onClick={() => changeQty(item.id, 1)} className="grid h-8 w-8 place-items-center rounded-xl bg-white"><Plus size={14} /></button></div><button onClick={() => remove(item.id)} className="grid h-9 w-9 place-items-center rounded-2xl bg-red-50 text-red-600"><Trash2 size={16} /></button></div>)}</div>
      </div>
    </div>
  );
}

function ProfileScreen({ profile, setProfile, back }) {
  const needsText = profile.needs.map((id) => label(needs, id)).join(" · ") || "Sin necesidades";
  const allergyText = profile.allergies.map((id) => label(allergies, id)).join(" · ") || "Sin alergias marcadas";
  const healthText = profile.health.map((id) => label(health, id)).join(" · ") || "Sin objetivos";
  return (
    <div className="h-full overflow-y-auto bg-white pb-28">
      <Header title="Perfil" back={back} />
      <div className="px-5 pt-5"><div className="rounded-[34px] bg-zinc-950 p-5 text-white"><div className="flex items-center gap-3"><div className="grid h-14 w-14 place-items-center rounded-3xl bg-white/10"><User size={24} /></div><div><div className="text-xl font-black">Compra inteligente</div><div className="text-sm text-white/60">Filtros activos</div></div></div></div><Info title="Dieta" text={label(diets, profile.diet)} /><Info title="Necesidades" text={needsText} /><Info title="Alergias" text={allergyText} red={profile.allergies.length > 0} /><Info title="Salud" text={healthText} /><button onClick={() => setProfile(defaultProfile)} className="mt-6 w-full rounded-3xl bg-zinc-950 py-4 text-sm font-black text-white">Restablecer filtros</button></div>
    </div>
  );
}

function Info({ title, text, red = false }) {
  return <div className="mt-4 rounded-[24px] border border-zinc-100 bg-zinc-50 p-4"><div className="text-sm font-black">{title}</div><div className={cn("mt-1 text-sm font-semibold", red ? "text-red-700" : "text-zinc-600")}>{text}</div></div>;
}

function Chat({ open, close, compare }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "ai", text: "Puedo ayudarte con perder peso, hierro, azúcar, sal, alergias y opciones veganas." }]);
  function ask(text) {
    const q = text || input.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    let answer = "La opción más equilibrada son las lentejas: hierro, fibra y precio bajo.";
    if (lower.includes("peso") || lower.includes("adelgazar") || lower.includes("perder")) answer = "Para perder peso priorizaría espinacas, tofu o yogur proteico si no evitas lactosa. Las legumbres son saciantes, pero mejor con ración moderada.";
    if (lower.includes("azúcar")) answer = "Para menos azúcar: espinacas, tofu, avena y lentejas.";
    if (lower.includes("vegano")) answer = "Opciones veganas: lentejas, garbanzos, espinacas, avena y tofu.";
    if (lower.includes("lactosa")) answer = "Sin lactosa: evita el yogur proteico.";
    if (lower.includes("gluten")) answer = "Sin gluten: evita la avena de esta simulación.";
    setMessages((prev) => [...prev, { from: "user", text: q }, { from: "ai", text: answer }]);
    setInput("");
  }
  if (!open) return null;
  return (
    <motion.div className="absolute inset-0 z-50 bg-white" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}>
      <Header title="Asistente IA" close={close} />
      <div className="flex h-[calc(100%-92px)] flex-col px-5 pb-5"><div className="flex-1 space-y-4 overflow-y-auto pt-6">{messages.map((m, i) => <div key={i} className={m.from === "user" ? "ml-auto max-w-[78%] rounded-[24px] bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-950" : "mr-auto max-w-[84%] rounded-[24px] bg-zinc-100 px-4 py-3 text-sm leading-6 text-zinc-800"}>{m.text}</div>)}<div className="flex flex-wrap gap-2">{["Perder peso", "Más hierro", "Menos azúcar", "Vegano", "Sin lactosa", "Sin gluten", "Comparar"].map((chip) => <button key={chip} onClick={() => chip === "Comparar" ? compare() : ask(chip)} className="rounded-full border border-zinc-200 px-3 py-2 text-[12px] font-black">{chip}</button>)}</div></div><div className="mt-4 flex gap-2 rounded-[26px] border border-zinc-200 bg-zinc-50 p-3"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") ask(); }} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Escribe..." /><button onClick={() => ask()} className="grid h-10 w-10 place-items-center rounded-full bg-white"><Mic size={18} /></button></div></div>
    </motion.div>
  );
}

export default function NutriguiaWebExperience() {
  const [screen, setScreen] = useState("home");
  const [active, setActive] = useState("home");
  const [selectedAisle, setSelectedAisle] = useState("legumbres");
  const [profile, setProfile] = useState(defaultProfile);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [compareItems, setCompareItems] = useState(products.slice(0, 3));
  const [showAll, setShowAll] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [cart, setCart] = useState([{ ...products[0], qty: 1 }, { ...products[1], qty: 1 }]);

  const aisleName = label(aisles, selectedAisle);
  const recommended = useMemo(() => {
    const scored = products.map((p) => ({ ...p, aiScore: aiScore(p, profile, selectedAisle) }));
    return scored
      .filter((p) => p.aisle === selectedAisle)
      .sort((a, b) => b.aiScore - a.aiScore);
  }, [profile, selectedAisle]);

  function notify(text) {
    setToast(text);
    window.setTimeout(() => setToast(""), 1300);
  }

  function go(target) {
    setActive(target);
    if (target === "home") setScreen("home");
    if (target === "results") setScreen("results");
    if (target === "list") setScreen("list");
    if (target === "profile") setScreen("profile");
  }

  function add(product) {
    if (conflicts(product, profile).length > 0) {
      notify("Producto bloqueado por tus filtros");
      return;
    }
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    notify("Añadido a la lista");
  }

  function openDetail(product) {
    setSelectedProduct(product);
    setScreen("detail");
  }

  function openCompare(product) {
    setCompareItems([product, ...products.filter((p) => p.id !== product.id)].slice(0, 3));
    setScreen("compare");
  }

  function openMap(product) {
    setSelectedProduct(product);
    setScreen("map");
  }

  let content = null;
  if (screen === "home") content = <HomeScreen selectedAisle={selectedAisle} setSelectedAisle={setSelectedAisle} next={() => setScreen("needs")} />;
  if (screen === "needs") content = <NeedsScreen profile={profile} setProfile={setProfile} next={() => { setActive("results"); setScreen("results"); }} aisleName={aisleName} />;
  if (screen === "results") content = <ResultsScreen items={recommended} profile={profile} selectedAisle={selectedAisle} aisleName={aisleName} onAdd={add} onDetail={openDetail} onCompare={openCompare} onMap={openMap} onList={() => go("list")} onAll={() => notify("Ya estás viendo los productos de este pasillo")} />;
  if (screen === "detail") content = <DetailScreen product={selectedProduct} profile={profile} back={() => setScreen("results")} add={add} compare={openCompare} map={openMap} />;
  if (screen === "compare") content = <CompareScreen items={compareItems} profile={profile} back={() => setScreen("results")} add={add} />;
  if (screen === "map") content = <MapScreen product={selectedProduct} back={() => setScreen("results")} />;
  if (screen === "list") content = <ListScreen cart={cart} setCart={setCart} back={() => setScreen("results")} />;
  if (screen === "profile") content = <ProfileScreen profile={profile} setProfile={setProfile} back={() => setScreen("results")} />;

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_0%,#e9fff1,transparent_34%),radial-gradient(circle_at_80%_8%,#f2f5ff,transparent_28%),linear-gradient(180deg,#fbfbf8,#f4f5f1)] px-5 py-8 font-sans text-zinc-950">
      <div className="mx-auto flex max-w-[430px] items-start justify-center">
        <main className="relative w-full max-w-[430px]">
          <Phone>
            <AnimatePresence mode="wait"><motion.div key={screen} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.2 }} className="h-full">{content}</motion.div></AnimatePresence>
            <BottomNav active={active} go={go} count={cart.reduce((sum, item) => sum + item.qty, 0)} />
            <button onClick={() => setChatOpen(true)} className="absolute bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-zinc-950 text-white shadow-2xl"><Bot size={22} /></button>
            <Chat open={chatOpen} close={() => setChatOpen(false)} compare={() => { setChatOpen(false); setCompareItems(products.slice(0, 3)); setScreen("compare"); }} />
            <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="absolute left-5 right-5 top-16 z-[95] rounded-2xl bg-zinc-950/92 px-4 py-3 text-center text-sm font-black text-white shadow-2xl">{toast}</motion.div>}</AnimatePresence>
          </Phone>
        </main>
      </div>
    </div>
  );
}
