function getColor() {
  const popColors = [
    "#FFB900",
    "#FF5630",
    "#36B37E",
    "#00B8D9",
    "#6554C0",
    "#FF6E4A",
    "#5E2CA5",
    "#00B3A4",
    "#FF9833",
    "#00A8E8",
    "#C239B3",
    "#00C781",
    "#FF8F73",
    "#0077CC",
    "#9933CC",
    "#FF6EB4",
    "#3D3D3D",
    "#EB144C",
    "#5C636B",
    "#E68523",
    "#332F2F",
    "#00A3A1",
    "#FFAC27",
    "#BA2F0F",
    "#642F6C",
    "#4285F4",
    "#DB4437",
    "#F4B400",
    "#0F9D58",
    "#AB47BC",
    "#00ACC1",
    "#FF7043",
    "#9E9D24",
    "#F7931E",
    "#00C853",
    "#0057A5",
    "#D500F9",
    "#F50057",
    "#2979FF",
    "#1DE9B6",
    "#FFD600",
    "#FFAB40",
    "#FF6E40",
    "#FF3D00",
    "#FF1744",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#D50000",
    "#C51162",
    "#AA00FF",
    "#6200EA",
    "#304FFE",
    "#2962FF",
    "#0091EA",
    "#00B8D4",
    "#00BFA5",
    "#64DD17",
    "#AEEA00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
  ];

  const randomIndex = Math.floor(Math.random() * popColors.length);
  const randomColor = popColors[randomIndex];

  return randomColor;
}

module.exports = getColor;