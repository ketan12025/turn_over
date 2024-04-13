const ContainerTypes = {
  UserController: Symbol.for("UserController"),
  UserService: Symbol.for("UserService"),
  UserRepository: Symbol.for("UserRepository"),

  CategoryController: Symbol.for("CategoryController"),
  CategoryService: Symbol.for("CategoryService"),
  CategoryRepository: Symbol.for("CategoryRepository"),
};

export { ContainerTypes };
