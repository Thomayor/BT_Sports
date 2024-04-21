export default function formatDate(date: Date) {
    const parsedDate = new Date(date);
  
    // Obtenir les éléments de date (jour, mois, année)
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();
  
    // Formater la date au format "jour, mois, année"
    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  
    return formattedDate;
}