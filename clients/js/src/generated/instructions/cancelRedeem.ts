/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type CancelRedeemInstructionAccounts = {
  treeAuthority: PublicKey;
  leafOwner: Signer;
  merkleTree: PublicKey;
  voucher: PublicKey;
  logWrapper?: PublicKey;
  compressionProgram?: PublicKey;
  systemProgram?: PublicKey;
};

// Data.
export type CancelRedeemInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
};

export type CancelRedeemInstructionDataArgs = { root: Uint8Array };

export function getCancelRedeemInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<CancelRedeemInstructionDataArgs, CancelRedeemInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    CancelRedeemInstructionDataArgs,
    any,
    CancelRedeemInstructionData
  >(
    s.struct<CancelRedeemInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['root', s.bytes({ size: 32 })],
      ],
      { description: 'CancelRedeemInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [111, 76, 232, 50, 39, 175, 48, 242],
    })
  ) as Serializer<CancelRedeemInstructionDataArgs, CancelRedeemInstructionData>;
}

// Args.
export type CancelRedeemInstructionArgs = CancelRedeemInstructionDataArgs;

// Instruction.
export function cancelRedeem(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: CancelRedeemInstructionAccounts & CancelRedeemInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplBubblegum',
      'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'logWrapper',
    input.logWrapper ?? {
      ...context.programs.getPublicKey(
        'splNoop',
        'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'compressionProgram',
    input.compressionProgram ?? {
      ...context.programs.getPublicKey(
        'splAccountCompression',
        'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'systemProgram',
    input.systemProgram ?? {
      ...context.programs.getPublicKey(
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isWritable: false,
    }
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Tree Authority.
  keys.push({
    pubkey: resolvedAccounts.treeAuthority,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.treeAuthority, false),
  });

  // Leaf Owner.
  signers.push(resolvedAccounts.leafOwner);
  keys.push({
    pubkey: resolvedAccounts.leafOwner.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.leafOwner, true),
  });

  // Merkle Tree.
  keys.push({
    pubkey: resolvedAccounts.merkleTree,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.merkleTree, true),
  });

  // Voucher.
  keys.push({
    pubkey: resolvedAccounts.voucher,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.voucher, true),
  });

  // Log Wrapper.
  keys.push({
    pubkey: resolvedAccounts.logWrapper,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.logWrapper, false),
  });

  // Compression Program.
  keys.push({
    pubkey: resolvedAccounts.compressionProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.compressionProgram, false),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Data.
  const data =
    getCancelRedeemInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
