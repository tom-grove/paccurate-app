import printerPic from "../assets/images/inventoryItems/3dPrinter.png";
import controllerPic from "../assets/images/inventoryItems/Controller.png";
import drawersPic from "../assets/images/inventoryItems/Drawers.png";
import headphonesPic from "../assets/images/inventoryItems/Headphones.png";
import mousePic from "../assets/images/inventoryItems/Mouse.png";
import mugPic from "../assets/images/inventoryItems/Mug.png";
import paintingPic from "../assets/images/inventoryItems/Painting.png";
import pliersPic from "../assets/images/inventoryItems/Pliers.png";
import speakerPic from "../assets/images/inventoryItems/Speaker.png";
import turtlePic from "../assets/images/inventoryItems/Turtle.png";

export const inventoryItems = [
  {
    id: 1,
    name: "3D Printer",
    weight: "20",
    dimensions: {
      x: 15,
      y: 20,
      z: 15
    },
    image: printerPic
  },
  {
    id: 2,
    name: "Controller",
    weight: "2",
    dimensions: {
      x: 6,
      y: 4,
      z: 2
    },
    image: controllerPic
  },
  {
    id: 3,
    name: "Drawers",
    weight: "1",
    dimensions: {
      x: 4,
      y: 4,
      z: 4
    },
    image: drawersPic
  },
  {
    id: 4,
    name: "Headphones",
    weight: "2",
    dimensions: {
      x: 8,
      y: 9,
      z: 5
    },
    image: headphonesPic
  },
  {
    id: 5,
    name: "Mouse",
    weight: "3",
    dimensions: {
      x: 4,
      y: 2,
      z: 5
    },
    image: mousePic
  },
  {
    id: 6,
    name: "Mug",
    weight: "5",
    dimensions: {
      x: 5,
      y: 6,
      z: 4
    },
    image: mugPic
  },
  {
    id: 7,
    name: "Painting",
    weight: "3",
    dimensions: {
      x: 12,
      y: 10,
      z: 2
    },
    image: paintingPic
  },
  {
    id: 8,
    name: "Pliers",
    weight: "2",
    dimensions: {
      x: 6,
      y: 10,
      z: 1
    },
    image: pliersPic
  },
  {
    id: 9,
    name: "Speaker",
    weight: "5",
    dimensions: {
      x: 4,
      y: 10,
      z: 8
    },
    image: speakerPic
  },
  {
    id: 10,
    name: "Turtle",
    weight: "2",
    dimensions: {
      x: 6,
      y: 10,
      z: 6
    },
    image: turtlePic
  }
]