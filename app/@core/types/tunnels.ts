export type CFTunnelResp = {
  success: boolean;
  messages: Array<string>;
  errors: Array<string>;
  result: Array<CFTunnel> | [];
};

export type CFTunnel = {
  id: string;
  account_tag: string;
  created_at: string;
  deleted_at: string;
  name: string;
  connections: Array<CFTunnelConnections> | [];
  conns_active_at: string;
  conns_inactive_at: string;
  status: string;
  remote_config: boolean;
};

export type CFTunnelConnections = {
  colo_name: string;
  id: string;
  is_pending_reconnect: boolean;
  client_id: string;
  client_version: string;
  opened_at: string;
  origin_ip: string;
};
