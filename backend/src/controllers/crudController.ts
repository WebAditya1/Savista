import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

export function createCrudController<T extends Document>(model: Model<T>) {
  return {
    getAll: async (req: Request, res: Response) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      const filter: Record<string, unknown> = {};

      if (req.query.category) filter.category = req.query.category;
      if (req.query.subcategory) filter.subcategory = req.query.subcategory;
      if (req.query.type) filter.type = req.query.type;
      if (req.query.featured === 'true') filter.featured = true;
      if (req.query.search) {
        const search = req.query.search as string;
        if (search.includes('-')) {
          filter.subcategory = search;
        } else {
          filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { title: { $regex: search, $options: 'i' } },
            { question: { $regex: search, $options: 'i' } },
            { subcategory: { $regex: search, $options: 'i' } },
          ];
        }
      }

      const [data, total] = await Promise.all([
        model.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
        model.countDocuments(filter),
      ]);

      res.json({
        success: true,
        data,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    },

    getById: async (req: Request, res: Response) => {
      const item = await model.findById(req.params.id);
      if (!item) {
        res.status(404).json({ success: false, error: 'Not found' });
        return;
      }
      res.json({ success: true, data: item });
    },

    getBySlug: async (req: Request, res: Response) => {
      const item = await model.findOne({ slug: req.params.slug });
      if (!item) {
        res.status(404).json({ success: false, error: 'Not found' });
        return;
      }
      res.json({ success: true, data: item });
    },

    create: async (req: Request, res: Response) => {
      const item = await model.create(req.body);
      res.status(201).json({ success: true, data: item });
    },

    update: async (req: Request, res: Response) => {
      const item = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        res.status(404).json({ success: false, error: 'Not found' });
        return;
      }
      res.json({ success: true, data: item });
    },

    remove: async (req: Request, res: Response) => {
      const item = await model.findByIdAndDelete(req.params.id);
      if (!item) {
        res.status(404).json({ success: false, error: 'Not found' });
        return;
      }
      res.json({ success: true, message: 'Deleted successfully' });
    },
  };
}
