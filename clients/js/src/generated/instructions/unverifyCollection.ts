/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  findMasterEditionPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bytes,
  mapSerializer,
  struct,
  u32,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { resolveCreatorHash, resolveDataHash } from '../../hooked';
import { findTreeConfigPda } from '../accounts';
import { PickPartial, addAccountMeta, addObjectProperty } from '../shared';
import {
  MetadataArgs,
  MetadataArgsArgs,
  getMetadataArgsSerializer,
} from '../types';

// Accounts.
export type UnverifyCollectionInstructionAccounts = {
  treeConfig?: PublicKey | Pda;
  leafOwner: PublicKey | Pda;
  leafDelegate?: PublicKey | Pda;
  merkleTree: PublicKey | Pda;
  payer?: Signer;
  /**
   * the case of `set_and_verify_collection` where
   * we are actually changing the NFT metadata.
   */

  treeCreatorOrDelegate?: PublicKey | Pda;
  collectionAuthority?: Signer;
  /**
   * If there is no collecton authority record PDA then
   * this must be the Bubblegum program address.
   */

  collectionAuthorityRecordPda?: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionMetadata?: PublicKey | Pda;
  collectionEdition?: PublicKey | Pda;
  bubblegumSigner?: PublicKey | Pda;
  logWrapper?: PublicKey | Pda;
  compressionProgram?: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type UnverifyCollectionInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: bigint;
  index: number;
  metadata: MetadataArgs;
};

export type UnverifyCollectionInstructionDataArgs = {
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: number | bigint;
  index: number;
  metadata: MetadataArgsArgs;
};

/** @deprecated Use `getUnverifyCollectionInstructionDataSerializer()` without any argument instead. */
export function getUnverifyCollectionInstructionDataSerializer(
  _context: object
): Serializer<
  UnverifyCollectionInstructionDataArgs,
  UnverifyCollectionInstructionData
>;
export function getUnverifyCollectionInstructionDataSerializer(): Serializer<
  UnverifyCollectionInstructionDataArgs,
  UnverifyCollectionInstructionData
>;
export function getUnverifyCollectionInstructionDataSerializer(
  _context: object = {}
): Serializer<
  UnverifyCollectionInstructionDataArgs,
  UnverifyCollectionInstructionData
> {
  return mapSerializer<
    UnverifyCollectionInstructionDataArgs,
    any,
    UnverifyCollectionInstructionData
  >(
    struct<UnverifyCollectionInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['root', bytes({ size: 32 })],
        ['dataHash', bytes({ size: 32 })],
        ['creatorHash', bytes({ size: 32 })],
        ['nonce', u64()],
        ['index', u32()],
        ['metadata', getMetadataArgsSerializer()],
      ],
      { description: 'UnverifyCollectionInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [250, 251, 42, 106, 41, 137, 186, 168],
    })
  ) as Serializer<
    UnverifyCollectionInstructionDataArgs,
    UnverifyCollectionInstructionData
  >;
}

// Extra Args.
export type UnverifyCollectionInstructionExtraArgs = {
  proof: Array<PublicKey>;
};

// Args.
export type UnverifyCollectionInstructionArgs = PickPartial<
  UnverifyCollectionInstructionDataArgs &
    UnverifyCollectionInstructionExtraArgs,
  'dataHash' | 'creatorHash' | 'proof'
>;

// Instruction.
export function unverifyCollection(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity' | 'payer'>,
  input: UnverifyCollectionInstructionAccounts &
    UnverifyCollectionInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplBubblegum',
    'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    leafOwner: [input.leafOwner, false] as const,
    merkleTree: [input.merkleTree, true] as const,
    collectionMint: [input.collectionMint, false] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'treeConfig',
    input.treeConfig
      ? ([input.treeConfig, false] as const)
      : ([
          findTreeConfigPda(context, {
            merkleTree: publicKey(input.merkleTree, false),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'leafDelegate',
    input.leafDelegate
      ? ([input.leafDelegate, false] as const)
      : ([input.leafOwner, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'payer',
    input.payer
      ? ([input.payer, false] as const)
      : ([context.payer, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'treeCreatorOrDelegate',
    input.treeCreatorOrDelegate
      ? ([input.treeCreatorOrDelegate, false] as const)
      : ([context.identity.publicKey, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionAuthority',
    input.collectionAuthority
      ? ([input.collectionAuthority, false] as const)
      : ([context.identity, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionAuthorityRecordPda',
    input.collectionAuthorityRecordPda
      ? ([input.collectionAuthorityRecordPda, false] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionMetadata',
    input.collectionMetadata
      ? ([input.collectionMetadata, true] as const)
      : ([
          findMetadataPda(context, {
            mint: publicKey(input.collectionMint, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionEdition',
    input.collectionEdition
      ? ([input.collectionEdition, false] as const)
      : ([
          findMasterEditionPda(context, {
            mint: publicKey(input.collectionMint, false),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'bubblegumSigner',
    input.bubblegumSigner
      ? ([input.bubblegumSigner, false] as const)
      : ([
          publicKey('4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK'),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'logWrapper',
    input.logWrapper
      ? ([input.logWrapper, false] as const)
      : ([
          context.programs.getPublicKey(
            'splNoop',
            'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'compressionProgram',
    input.compressionProgram
      ? ([input.compressionProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splAccountCompression',
            'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'tokenMetadataProgram',
    input.tokenMetadataProgram
      ? ([input.tokenMetadataProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'mplTokenMetadata',
            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'systemProgram',
    input.systemProgram
      ? ([input.systemProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvingArgs,
    'dataHash',
    input.dataHash ??
      resolveDataHash(
        context,
        { ...input, ...resolvedAccounts },
        { ...input, ...resolvingArgs },
        programId,
        false
      )
  );
  addObjectProperty(
    resolvingArgs,
    'creatorHash',
    input.creatorHash ??
      resolveCreatorHash(
        context,
        { ...input, ...resolvedAccounts },
        { ...input, ...resolvingArgs },
        programId,
        false
      )
  );
  addObjectProperty(resolvingArgs, 'proof', input.proof ?? []);
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.treeConfig, false);
  addAccountMeta(keys, signers, resolvedAccounts.leafOwner, false);
  addAccountMeta(keys, signers, resolvedAccounts.leafDelegate, false);
  addAccountMeta(keys, signers, resolvedAccounts.merkleTree, false);
  addAccountMeta(keys, signers, resolvedAccounts.payer, false);
  addAccountMeta(keys, signers, resolvedAccounts.treeCreatorOrDelegate, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionAuthority, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionAuthorityRecordPda,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.collectionMint, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMetadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionEdition, false);
  addAccountMeta(keys, signers, resolvedAccounts.bubblegumSigner, false);
  addAccountMeta(keys, signers, resolvedAccounts.logWrapper, false);
  addAccountMeta(keys, signers, resolvedAccounts.compressionProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.tokenMetadataProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);

  // Remaining Accounts.
  const remainingAccounts = resolvedArgs.proof.map(
    (address) => [address, false] as const
  );
  remainingAccounts.forEach((remainingAccount) =>
    addAccountMeta(keys, signers, remainingAccount, false)
  );

  // Data.
  const data =
    getUnverifyCollectionInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
