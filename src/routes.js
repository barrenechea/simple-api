import menu from './menu.js';
import Order from './db/Order.js';

/**
 * @openapi
 * /menu:
 *   get:
 *     description: Returns the restaurant's menu.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
const getMenu = (_, res) => {
  res.json({ menu });
};

/**
 * @openapi
 * /orders:
 *   get:
 *     description: List all orders
 *     responses:
 *       200:
 *         description: Returns an array of orders.
 */
const getOrders = async (_, res) => {
  const orders = await Order.findAll();

  res.json({ orders });
};

/**
 * @openapi
 * /orders:
 *   post:
 *     description: Creates a new order
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         properties:
 *          table:
 *           type: string
 *           description: The table number
 *          customer:
 *           type: string
 *           description: The customer's name
 *          items:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *             id:
 *              type: string
 *              description: One of the menu items' id
 *             quantity:
 *              type: integer
 *              description: The quantity of the item
 *         required:
 *         - table
 *         - customer
 *         - items
 *     responses:
 *       201:
 *         description: An order has been created.
 *       500:
 *         description: Something catastrophic has happened.
 */
const postOrder = async (req, res) => {
  const payload = req.body;
  try {
    const order = await Order.create({
      ...payload,
      status: 'pending'
    });

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const wrapRoutes = (express) => {
  express.get('/menu', getMenu);
  express.get('/orders', getOrders);
  express.post('/orders', postOrder);
}