import Room from "../models/room";

export default {
  async findOne(req, res, next) {
    const room = await Room.findOne({ slug: req.params.slug });
    if (!room) return next();
    return res.status(200).send({ data: room });
  },

  async findAll(req, res) {
    const rooms = await Room.find().sort({ createdAt: "desc" });
    return res.status(200).send({ data: rooms });
  },

  async create(req, res) {
    const room = await new Room({
      roomName: req.body.roomName,
      roomDescription: req.body.roomDescription,
      roomSeatsPlan: req.body.roomSeatsPlan,
      // roomName: 'Test room',
      // roomDescription: 'Lorem ipsum',
      // roomSeatsPlan: [[true,false]]
    }).save();

    return res.status(201).send({ data: room, message: `Room was created` });
  },

  async update(req, res, next) {
    const room = await Room.find({ slug: req.params.slug });
    if (!room) return next();

    room.roomName = req.body.roomName;
    room.roomDescription = req.body.roomDescription;
    room.roomSeatsPlan = req.body.roomSeatsPlan;

    await room.save();

    return res.status(200).send({ data: room, message: `Room was updated` });
  },

  async remove(req, res, next) {
    const room = await Room.findOne({ slug: req.params.slug });
    if (!room) return next();
    await room.remove();

    return res.status(200).send({ message: `Room was removed` });
  },
};
