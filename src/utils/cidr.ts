export function calculateCIDR(ipAddress: string, maskBits: number) {
  // Convert IP to binary
  const ipBinary = ipAddress.split('.').map(octet => 
    parseInt(octet).toString(2).padStart(8, '0')
  ).join('');

  // Calculate network and wildcard masks
  const networkMask = '1'.repeat(maskBits).padEnd(32, '0');
  const wildcardMask = '0'.repeat(maskBits).padEnd(32, '1');

  // Calculate CIDR network
  const networkBinary = ipBinary.split('').map((bit, i) => 
    bit === '1' && networkMask[i] === '1' ? '1' : '0'
  ).join('');

  // Calculate address range
  const startAddress = networkBinary;
  const endAddress = networkBinary.slice(0, maskBits) + wildcardMask.slice(maskBits);

  return {
    networkAddress: binaryToIP(networkBinary),
    wildcardMask: binaryToIP(wildcardMask),
    startIP: binaryToIP(startAddress),
    endIP: binaryToIP(endAddress),
    maxAddresses: Math.pow(2, 32 - maskBits) - 2,
    maxSubnets: Math.pow(2, maskBits),
    cidrNotation: `${binaryToIP(networkBinary)}/${maskBits}`,
    netmask: binaryToIP(networkMask)
  };
}

export function binaryToIP(binary: string): string {
  return binary.match(/.{8}/g)?.map(byte => 
    parseInt(byte, 2).toString()
  ).join('.') || '0.0.0.0';
}

export function isValidIP(ip: string): boolean {
  const parts = ip.split('.');
  return parts.length === 4 && parts.every(part => {
    const num = parseInt(part);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}
