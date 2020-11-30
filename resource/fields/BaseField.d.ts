interface Cache {
  time: Number;
}

interface using {
  placeholder:? String;
  cache:? Cache
}


class Base {
  static make(label: String, field: String): Base;

  using(arg: using): Base;

  type(arg: 'email'): Base;
  type(arg: 'file'): Base;
  type(arg: 'password'): Base;

  protect(arg: 'hash'): Base;
  protect(arg: 'encrypt'): Base;

  rules(arg: String): Base;
  event(arg: String): Base;
  action(arg: String): Base;

  path(route: String, method: 'GET'): Base;
  path(route: String, method: 'POST'): Base;
  path(route: String, method: 'PUT'): Base;
  path(route: String, method: 'DELETE'): Base;
}

export = Base;