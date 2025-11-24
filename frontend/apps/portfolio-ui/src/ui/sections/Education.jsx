/* // Education.jsx
<Grid container spacing={2}>
  {education.map((ed) => (
    <Grid item xs={12} key={ed._id}>
      <Typography variant="h6">{ed.degree}</Typography>
      <Typography variant="body2" color="text.secondary">{ed.institution}</Typography>
      <Typography variant="body1">{ed.startYear} - {ed.endYear}</Typography>
    </Grid>
  ))}
</Grid>
 */