import { Schema, model } from 'mongoose';

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  profile_picture: {
    type: String,
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAMFBMVEXk5ueutLfo6eqqsLS0uby3vL/Y29y7wMLU19m+wsXf4ePN0NLGyszs7u/AxcfJzc+mabbVAAACyUlEQVR4nO2a3bajIAyFJfwIyOj7v+1BbTttT8UEEzprFt9N26vs7gSIwWHodDqdTqfT6XQ6nf8SgNfP5uHdMo/W2jHMU2wuAsAHrdWd/DW5lhpgWHJU9YbxzTTA9Dv85oSNTTTAYD/G3zQsDSSAO4y/2SAvYCrE3xDOBEwlB3ZkBfhzAaISyjXwwAhKMBgBSs9SpQABJSAjtTfhcrAhowDQ8ZVKEhJw6+COgABsGe6IbM+EKlAiKxK/EHYTPLuCSBKg1MieBlIdrnALgEQUoBy3AspKWNETdxqoFijuw4FaiEpZZgWOrID7bCAvBaW5FZAt6Ar+BQXclfj9tUDfD7iPJkqLtsPdqIGlKuBuEGChbkmRWQGxSVMSDTvxeObv14ktiuZuUDKRlAaRScZIsYC9Q1qhmCDzAA94E7TQcBG/M3N3aHfwuxL7bvSQEFAStORwFbMtaZHhwR1EKchNkZASNP8j6ysQTbEWpB3YKJajyF74zvFoWZs24/2cifmzDU0MeGh4v+TQZmp71wSDD0bpG8omNzS/cMv/OLppSWnxLrYPvwrI/Lmxfm8bOzo/zcEateUhn4VhXryPLa4+N+fH9XR4LcTbL5u8aEJy+MUaXbzpykU5u0FEBYCbVTH6kyHBs+cDYvp8y3noRXCMIvLfpw2Vd6znSga4kTzG2o2wE4cGiJXxNw3Xb8NhODiE8BquNe5QMT76RbqSiosG7GhbawNUTK8ONNQ1DphLbrSEuUZA4hNQ9V4CsJTAE9SnaeTzGYnvOrBCcYE+ukMx4gVw7EMfIDxPiTig8I/19AEuXgJqtCFUBDsBo4A+xyeAyYPIQvwLYkmKWoA5pGCWVXA+cwfRHKjzVyPOX3y7TDgxgTK+rkOfZEE6Cac3D+S7nAqKA0/6ux4VFNsl4is/dZQ3JblD6Yni8WR0A4qlCC0oZqHT6XQ6X+UHtakeSGhp3XQAAAAASUVORK5CYII=',
    required: false,
  },
  level: {
    type: String,
    enum: ['JUNIOR', 'MIDDLE', 'SENIOR', 'EXPERT', 'INTERNSHIP'],
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'interviewer', 'interviewee'],
  },
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = model('User', user);

export default User;
