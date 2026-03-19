let deThis: any[] = [];

export default {
  'GET /api/de-thi': (req: any, res: any) => {
    res.json(deThis);
  },

  'POST /api/de-thi': (req: any, res: any) => {
    const newDeThi = {
      id: Date.now(),
      ...req.body,
    };
    deThis.push(newDeThi);
    res.json(newDeThi);
  },
};