// --- 1) Load all SVG files dynamically ---
const modules = import.meta.glob(
  "../assets/svgIcons/*.{svg,png}", 
  { eager: true }
);

const iconMap = {};

for (const path in modules) {
  const file = modules[path];
  const fileName = path.split("/").pop().replace(/\.(svg|png)$/, ""); // remove svg/png
  iconMap[fileName.toLowerCase()] = file.default;
}

// --- 2) Predefined keyword aliases ---
const ALIASES = {
  reacttypescript: "react",
  reactts: "react",
  materialui: "mui",
  muixcharts: "mui-x",
  muix: "mui-x",
  reduxToolkit: "redux",
  restfulapi: "restapi",
  restapi: "restapi",
  expressjs: "express",
  nodejs: "nodejs",
  d3js: "d3js",
  postgresql: "pgsql",
  sql: "pgsql",
  gitlabcicd: "gitlab",
  kubernetes: "kubernetes",
  agileandscrum: "agile",
  systemdesign: "system",
  frontend: "frontend",
  backend: "backend",
  devops: "devops",
  discord: "discord",
  ec2: "ec2",
  s3: "s3",
  html: "html",
  framer: "framer",
  cloudfront: "cloudfront",
  route53: "route53",
  ses: "ses",
  yarn: "yarn",
  ssh: "ssh",
  vnc: "vnc",
  other: "other",
};

// --- 3) Cleaner ---
const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, ""); // remove spaces, brackets, dots etc.

// --- 4) Universal Icon Resolver ---
export const getSkillIcon = (name) => {
  if (!name) return null;

  const cleaned = normalize(name);
  const keys = Object.keys(iconMap);

  // Exact match
  if (iconMap[cleaned]) {
    return iconMap[cleaned];
  }

  //Alias match
  if (ALIASES[cleaned]) {
    return iconMap[ALIASES[cleaned]];
  }

  //Partial match (ReactTypeScript contains react)
  const partial = keys.find(
    (key) => cleaned.includes(key) || key.includes(cleaned)
  );
  if (partial) return iconMap[partial];

  return null;
};
