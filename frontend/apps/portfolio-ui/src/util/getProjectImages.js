// src/utils/getProjectImages.js
const S3_BASE = "https://works-stuffs.s3.ap-southeast-2.amazonaws.com";

export function getProjectImages(projectName, count, ext = "png") {
  const folder = projectName; // project folder inside S3
  const images = [];
console.log(`Project: name and count: ${projectName} ${count}`);

  for (let i = 1; i <= count; i++) {
    images.push(`${S3_BASE}/${folder}/${projectName}-${i}.${ext}`);
  }
  
  return images;
}
