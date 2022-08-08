DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  uuid TEXT UNIQUE NOT NULL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  status INTEGER NOT NULL CHECK (COLUMN status in (0,1))
);

DROP TABLE IF EXISTS nodes;
CREATE TABLE nodes (
  uuid TEXT UNIQUE NOT NULL PRIMARY KEY,
  hostname TEXT UNIQUE NOT NULL,
  domain TEXT NOT NULL,
  location_uuid TEXT,
  FOREIGN KEY (location_uuid)
    REFERENCES locations (uuid)
      ON DELETE SET NULL
);

DROP TABLE IF EXISTS cfd_tunnel;
CREATE TABLE cfd_tunnel (
  uuid TEXT UNIQUE NOT NULL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  location_uuid TEXT,
  FOREIGN KEY (location_uuid)
    REFERENCES Locations (uuid)
      ON DELETE SET NULL
);

DROP TABLE IF EXISTS ingress_routes;
CREATE TABLE ingress_routes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hostname TEXT UNIQUE NOT NULL,
  domain TEXT NOT NULL,
  tunnel_uuid TEXT,
  FOREIGN KEY (tunnel_uuid)
    REFERENCES cfd_tunnel (uuid)
      ON DELETE SET NULL
);
