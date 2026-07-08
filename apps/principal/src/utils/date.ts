export const getFormattedDate = () => {
  try {
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    return formatter.format(new Date()) + ' (GMT +07:00)';
  } catch (e) {
    // Fallback
    return new Date().toISOString().replace('T', ' ').substring(0, 19) + ' (GMT +00:00)';
  }
};
