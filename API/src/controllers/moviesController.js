import Movie from "../models/movie";
import Seances from "../models/seanse";

export default {
  async findOne(req, res, next) {
    const movie = await Movie.findOne({ _id: req.params.id });
    const seances = await Seances.find({ movie: req.params.id });
    if (!movie) return next();
    return res.status(200).send({ movie: movie, seances: seances });
  },

  async findAll(req, res) {
    const movies = await Movie.find().sort({ title: "desc" });
    return res.status(200).send({ data: movies });
  },

  async create(req, res) {
    const movie = await new Movie({
      title: req.body.title,
      movieDescription: req.body.movieDescription,
      movieImgUrl: req.body.movieImgUrl,
      // title: 'Test movie',
      // movieDescription: 'Lorem ipsum',
      // movieImgUrl: "http://image-base.com/image.png"
    }).save();

    return res.status(201).send({ data: movie, message: `Movie was created` });
  },

  async update(req, res, next) {
    const movie = await Movie.find({ _id: req.params.id });
    if (!movie) return next();

    movie.title = req.body.movieName;
    movie.movieDescription = req.body.movieDescription;
    movie.movieImgUrl = req.body.movieImgUrl;

    await movie.save();

    return res.status(200).send({ data: movie, message: `Movie was updated` });
  },

  async remove(req, res, next) {
    const movie = await Movie.findOne({ _id: req.params.id });
    if (!movie) return next();
    await movie.remove();

    return res.status(200).send({ message: `Movie was removed` });
  },
};
