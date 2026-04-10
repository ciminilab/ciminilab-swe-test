# Cimini Lab Takehome assignment

---

The following is a take-home assessment that we would like for you to complete to help us get a better understanding of your coding style.

The point of the assessment is not to test your pythonic or algorithmic knowledge in a time-constrained manner. Rather, it is to get an idea of your coding style and practices.

The task is to implement [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

If you are not already familiar with it, please acquaint yourself with the linked wikipedia article, or search for and read one of the many, many articles written about it.

The task is generally open ended. There are a few constraints & requirements:

1) You *should* spend roughly 30-60 minutes getting an overview of what it's about (it is a surprisingly deep topic, but a simple understanding is sufficient for this task).

2) You *should* spend roughly 60 minutes implementing your solution. Again, given the depth of the topic, one could spend much more time building very sophisticated simulations. Please do not. Although you are not timed or monitored, it will only count against you if your solution obviously has many hours of work put into it. This is to be fair to other candidates who may not have the same time availability.

3) Your solution *must* be written in Python 3.

4) You *must* provide a `Readme.md` file.

  * The readme file *must* explain how to install, and how to run the code. The command to install *must* be one line, and the code to run *must* also be one line. I should be able to install and run in a python virtual environment (or similar). My preference for this is [`pixi`](https://pixi.sh), but you *may* use what you're most comfortable with, (e.g. `venv`, `uv`, `conda`, etc.)

  * The readme file *must* also contain a paragraph or so explaining your solution and code design.

  * The readme file *must* list any resources used (websites or articles you read, code repositories you referenced, AI tools, etc.) If you use an LLM you *must* include the list of prompts and/or spec files you used (your end of the conversation). Yoy *may* choose to share the entire session log, but take care to redact any personal information you might not want to share, such as pathnames containing the name of your home directory.

5) Your program *must* visually display a grid representing the game state over time.

  * 5 Your game grid *must* start in some initial state (up to you whether random or predefined), and *must* output the evolution of that state over successive steps in an animated way (fps is up to you).

  * Your game grid *should* be a toroid, rather than a bounded plane, although *may* have a more complex implementation such as an infinite plane. A toroid is just a fancy way of saying that the column one to the right of the right-most column is the left-most column and the row one below the bottom-most row is the top-most row (like Pacman).

Other than that, you may implement your solution however you choose. You *may* for instance choose to use type annotations or not. You *may* choose to take a functional approach, or an object-oriented one. You *may* choose to output the grid state to the terminal (e.g. using python's curses library to clear the screen) or use a GUI system.

You *may* use external dependencies outside of the python standard library (e.g. PyPI packages, etc.) Make sure these are included in your "pyproject.toml".

As mentioned above, use any resources you find helpful. Just make sure to cite it. You *may* choose to use an LLM with no consequence as long as you include all of your prompts so that we can see *how* you oriented the AI to generate the code you wanted, and in the style you wanted.

We hope this is a fun, low pressure way for you to showcase some technical skills. You *must* either email your solution, or create a *private* GitHub repository with `@gnodar01` added as a collaborator.

Don't hesitate to reach out if anything is unclear, but due to the open-ended nature of this assessment, know that the responses to many "Should I do A or B?" style questions will be "Up to you!"

Please submit your solution by the deadline emailed to you. If you need more time just let me know a few days ahead of the deadline.
