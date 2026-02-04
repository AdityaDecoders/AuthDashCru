import Task from "../models/task.js";


export const createdTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Task creation failed",
    });
  }
};


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetching tasks",
    });
  }
};


export const updateTask = async (req, res) => {
  try {
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.log("UPDATE ERROR 👉", error.message);
    res.status(400).json({ message: "Update failed" });
  }
};



export const deleteTask = async (req, res) => {
  try {
    

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.log("DELETE ERROR 👉", error.message);
    res.status(500).json({ message: "Delete failed" });
  }
};

